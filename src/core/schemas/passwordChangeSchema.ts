import z from "zod";

export const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(6).max(16),
    newPassword: z
      .string()
      .min(6)
      .max(16)
      .refine(
        (pw) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,16}$/.test(pw),
        {
          message:
            "Password must contain uppercase, lowercase, number, and special character",
        },
      ),
    passwordConfirmation: z.string(),
  })
  .refine(
    (data) => {
      return data.newPassword == data.passwordConfirmation;
    },
    {
      path: ["passwordConfirmation"],
      error: "Password confirmation not matched with password",
    },
  );

export type ChangePasswordDto = z.infer<typeof passwordChangeSchema>;
