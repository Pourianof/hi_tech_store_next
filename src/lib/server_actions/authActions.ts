"use server";
import {
  changePasswordApi,
  forgotPasswordApi,
  resetPasswordApi,
  updateUserPermissionsApi,
} from "@/api/authApi";

export const changePasswordAction = changePasswordApi;
export async function forgotPasswordAction(email: string) {
  if (!process.env.APP_URL) {
    throw new Error("No url for app specified");
  }

  const resetUrl = new URL(process.env.APP_URL!);

  resetUrl.pathname = "/auth/reset-password";

  return forgotPasswordApi({ email, returnUrl: resetUrl.toString() });
}

export const resetPasswordAction = resetPasswordApi;
export const updateUserPermissionsAction = updateUserPermissionsApi;
