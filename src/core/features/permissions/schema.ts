import { z } from "zod";

/**
 * Mirrors backend enums exactly (see PermissionScope / PermissionModificationAction
 * in HiTechStore.Core.Models / Dto).
 */
export const PermissionScope = {
  Self: "Self",
  All: "All",
} as const;
export type PermissionScope =
  (typeof PermissionScope)[keyof typeof PermissionScope];

export const PermissionModificationAction = {
  Grant: "Grant",
  Revoke: "Revoke",
} as const;
export type PermissionModificationAction =
  (typeof PermissionModificationAction)[keyof typeof PermissionModificationAction];

/**
 * A newly requested grant. Always submitted with action = Grant — revoking
 * an *existing* permission is handled separately by the "current
 * permissions" checklist (see revocationRowSchema below), not through this
 * row type.
 */
export const targetPermissionSchema = z.object({
  permissionCode: z.string().min(1, "Select a permission"),
  action: z.enum(PermissionModificationAction),
  scope: z.enum(PermissionScope),
});

export type TargetPermissionFormValues = z.infer<typeof targetPermissionSchema>;

/**
 * One line of the target user's *current* permissions, shown by default so
 * the actor can toggle a permission off (revoke). `revoke` starts false —
 * flipping it on is the only way this row ends up in the submission.
 * These rows are system-populated from the target's real grants, not
 * free-typed by the user, so validation here is intentionally light.
 */
export const revocationRowSchema = z.object({
  permissionCode: z.string(),
  scope: z.enum(PermissionScope),
  revoke: z.boolean(),
});

export type RevocationFormValues = z.infer<typeof revocationRowSchema>;

/**
 * Whole form: one target user, zero-or-more new grants, and zero-or-more
 * revocations of permissions the target currently holds. At least one
 * actual change (a grant row present, or a revocation toggled on) is
 * required to submit.
 */
export const modifyPermissionSchema = z
  .object({
    targetUserId: z.string().min(1, "Select a target user"),
    permissions: z
      .array(targetPermissionSchema)
      .default([])
      .superRefine((rows, ctx) => {
        // A permission code shouldn't be added twice as a new grant.
        const seen = new Set<string>();
        rows.forEach((row, index) => {
          if (seen.has(row.permissionCode)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "This permission was already added",
              path: [index, "permissionCode"],
            });
          }
          seen.add(row.permissionCode);
        });
      }),
    revocations: z.array(revocationRowSchema).default([]),
  })
  .refine(
    (data) =>
      data.permissions.length > 0 || data.revocations.some((r) => r.revoke),
    {
      message: "Add a new permission or revoke an existing one before saving.",
      path: ["permissions"],
    },
  );

export type ModifyPermissionFormValues = z.infer<typeof modifyPermissionSchema>;
