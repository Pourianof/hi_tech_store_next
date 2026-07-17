import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  MongoAbility,
} from "@casl/ability";
import { PermissionModificationAction, PermissionScope } from "./schema";

/**
 * ---------------------------------------------------------------------------
 * Rebuilt directly against the real ModifyPermissions() implementation
 * (not just the test file). Every rule below is commented with the exact
 * line(s) of server logic it mirrors, so the two can be diffed by eye when
 * the backend changes.
 *
 * Zero React / MUI imports here — pure business logic, unit tested in
 * ability.test.ts without rendering anything.
 *
 * The backend remains the sole authority. This engine only drives UX
 * (disabling options, explaining why) before a request is sent.
 * ---------------------------------------------------------------------------
 */

export const ACCESS_GRANT_PERMISSION_CODE = "access:grant";

/**
 * The ability engine's own action vocabulary — deliberately separate from
 * the backend's PermissionModificationAction ("Grant"/"Revoke") enum used
 * in the DTO. Keeping them as distinct namespaces (and normalizing between
 * them explicitly via toAbilityAction) avoids silent casing bugs, since
 * CASL action strings are matched case-sensitively.
 */
export const AbilityAction = {
  Access: "access",
  Grant: "grant",
  Revoke: "revoke",
  Modify: "modify",
} as const;
export type AbilityActionValue =
  (typeof AbilityAction)[keyof typeof AbilityAction];

/** Normalizes the form/DTO action enum ("Grant"/"Revoke") to the ability's own. */
export function toAbilityAction(
  action: PermissionModificationAction,
): AbilityActionValue {
  return action === "Grant" ? AbilityAction.Grant : AbilityAction.Revoke;
}

export interface ActorPermission {
  code: string;
  scope: PermissionScope;
}

/** Everything the ability needs about the person performing the action. */
export interface ActorContext {
  id: string;
  isAdmin: boolean;
  isManager: boolean;
  /** The actor's own permission grants — code + the exact scope they hold it at. */
  permissions: ActorPermission[];
}

/** Everything the ability needs about the user being modified. */
export interface TargetUserFacts {
  kind: "TargetUser";
  id: string;
  isAdmin: boolean;
  isManager: boolean;
  /** Derived: does the target itself hold access:grant? (locks their list) */
  hasAccessGrant: boolean;
  /** The target's current permission grants — needed for the revoke-scope check. */
  permissions: ActorPermission[];
}

export function toTargetUserFacts(input: {
  id: string;
  isAdmin: boolean;
  isManager: boolean;
  permissions: ActorPermission[];
}): TargetUserFacts {
  return {
    kind: "TargetUser",
    id: input.id,
    isAdmin: input.isAdmin,
    isManager: input.isManager,
    hasAccessGrant: input.permissions.some(
      (p) => p.code === ACCESS_GRANT_PERMISSION_CODE,
    ),
    permissions: input.permissions,
  };
}

interface PermissionFacts {
  kind: "Permission";
  code: string;
  scope: PermissionScope;
  /**
   * The scope the TARGET currently holds this permission at, if any.
   * Only relevant for the revoke-side check (existingPermission.Scope==Self
   * && requested.Scope==All). Pass null/undefined when unknown or not held.
   */
  targetScope?: PermissionScope | null;
}

export function toPermissionFacts(
  code: string,
  scope: PermissionScope,
  targetScope?: PermissionScope | null,
): PermissionFacts {
  return { kind: "Permission", code, scope, targetScope: targetScope ?? null };
}

type Actions = AbilityActionValue;
type Subjects =
  | "PermissionForm"
  | InferSubjects<PermissionFacts | TargetUserFacts>;

export type PermissionAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilityFor(actor: ActorContext): PermissionAbility {
  const { can, cannot, build } = new AbilityBuilder<PermissionAbility>(
    createMongoAbility,
  );

  // ---------------------------------------------------------------------
  // if (!isActorAdmin && !actorPermissions.Any(p => p.Code == Access.Grant))
  //     return GrantPermissionRequiredGrantAccess();
  // Admins bypass this check entirely.
  // ---------------------------------------------------------------------
  const actorHasAccessGrant = actor.permissions.some(
    (p) => p.code === ACCESS_GRANT_PERMISSION_CODE,
  );
  if (actor.isAdmin || actorHasAccessGrant) {
    can(AbilityAction.Access, "PermissionForm");
  } else {
    cannot(AbilityAction.Access, "PermissionForm").because(
      'You need the "Grant access" permission to modify anyone\'s permissions.',
    );
  }

  // ---------------------------------------------------------------------
  // Target-user modifiability. Base case: allowed; then narrowed by two
  // cannot rules below, added in the same priority order as the real
  // early-return checks (later-added rule wins ties, matching "the first
  // check that would return in the backend" taking visual priority here).
  // ---------------------------------------------------------------------
  can(AbilityAction.Modify, "TargetUser");

  // if (!isActorAdmin && (targetUser.IsManager() || targetUser.IsAdmin()))
  //     return NotAuthorizedToModifyTargetUsersPermissions();
  // else if (isActorAdmin && targetUser.IsAdmin())
  //     return AdminModifyAdminRestriction();
  if (!actor.isAdmin) {
    cannot(AbilityAction.Modify, "TargetUser", { isManager: true }).because(
      "This user is a manager, so only an admin can change their permissions.",
    );
    cannot(AbilityAction.Modify, "TargetUser", { isAdmin: true }).because(
      "This user is an admin, so only an admin can change their permissions.",
    );
  } else {
    cannot(AbilityAction.Modify, "TargetUser", { isAdmin: true }).because(
      "Admins cannot modify another admin's permissions.",
    );
  }

  // if (!isActorAdmin && !actorUser.IsManager() && targetUserHasAccessPermission)
  //     return LockingPermissionListForAccessGrantedTargetUser();
  // Both admins AND managers bypass this lock — added last so it wins over
  // the role-based rule above when both would apply, mirroring the real
  // code checking this condition first.
  if (!actor.isAdmin && !actor.isManager) {
    cannot(AbilityAction.Modify, "TargetUser", {
      hasAccessGrant: true,
    }).because(
      "This user can grant access to others, so their permission list is locked and cannot be edited here.",
    );
  }

  // ---------------------------------------------------------------------
  // Per-permission grant/revoke eligibility.
  //
  //   bool permCodeMatch = true, scopeMatch = true;
  //   if (!actorPermissions.Any(p => (permCodeMatch = p.Code == code)
  //                                && (scopeMatch = p.Scope == reqPerm.Scope)))
  //       return permCodeMatch
  //         ? CannotGrantPermissionScopeWhichHigherThanYou(...)
  //         : CannotGrantPermissionYouDoNotHave(...);
  //
  // This is an EXACT scope match, not "at most my scope" — the actor must
  // hold the permission at precisely the scope being granted/revoked.
  // This applies to every permission, including access:grant.
  // ---------------------------------------------------------------------
  cannot([AbilityAction.Grant, AbilityAction.Revoke], "Permission").because(
    "You can only grant or revoke a permission you hold yourself, at the exact scope you were granted.",
  );
  for (const perm of actor.permissions) {
    can([AbilityAction.Grant, AbilityAction.Revoke], "Permission", {
      code: perm.code,
      scope: {
        $in:
          perm.scope == PermissionScope.All
            ? [PermissionScope.All, PermissionScope.Self]
            : [PermissionScope.Self],
      },
    });
  }

  // if (!isActorAdmin && permission.Code == Access.Grant)
  //     return ForbiddenAccessGranting();
  // Applies to grant AND revoke, and applies even if the actor happens to
  // hold access:grant themselves — added last so it overrides the loop
  // above for non-admins.
  if (!actor.isAdmin) {
    cannot([AbilityAction.Grant, AbilityAction.Revoke], "Permission", {
      code: ACCESS_GRANT_PERMISSION_CODE,
    }).because(
      'Only an admin can grant or revoke the "Grant access" permission.',
    );
  }

  // else if (didUserHavePermission) {
  //   if (existingPermission.Scope == Self && reqPerm.Scope == All)
  //     return CannotGrantPermissionScopeWhichHigherThanYou(...);
  // }
  // Revoking "All" from a target that only actually holds "Self" doesn't
  // correspond to any real grant — blocked regardless of what the actor
  // themselves holds. Added last so it always wins for this exact combo.
  cannot(AbilityAction.Revoke, "Permission", {
    targetScope: "Self",
    scope: "All",
  }).because(
    "This user only holds this permission at Self scope, so All cannot be revoked.",
  );

  return build({
    detectSubjectType: (item) => item.kind,
  });
}

/** Human-readable reason attached to the rule that blocks `action` on `subj`, if any. */
export function explain(
  ability: PermissionAbility,
  action: Actions,
  subj: Subjects,
): string | undefined {
  return ability.relevantRuleFor(action, subj)?.reason;
}
