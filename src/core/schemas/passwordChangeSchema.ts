import z from "zod";

const strongPasswordSchema = z
  .string()
  .min(6)
  .max(16)
  .refine(
    (pw) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,16}$/.test(pw),
    {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    },
  );

function passwordWithConfirmationMatchingRule<T extends z.ZodObject>(
  schema: T,
) {
  return schema.refine(
    (data) => {
      return data.newPassword == data.passwordConfirmation;
    },
    {
      path: ["passwordConfirmation"],
      error: "Password confirmation not matched with password",
    },
  );
}

export const passwordChangeSchema = passwordWithConfirmationMatchingRule(
  z.object({
    oldPassword: z.string().min(6).max(16),
    newPassword: strongPasswordSchema,
    passwordConfirmation: z.string(),
  }),
);

export type ChangePasswordDto = z.infer<typeof passwordChangeSchema>;

export const passwordResettingSchema = passwordWithConfirmationMatchingRule(
  z.object({
    newPassword: strongPasswordSchema,
    passwordConfirmation: z.string(),
    email: z.email(),
    token: z.string(),
  }),
);

export type ResetPasswordDto = z.infer<typeof passwordResettingSchema>;
