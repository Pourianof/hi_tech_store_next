"use server";
import { register } from "@/api/authApi";
import { AuthResult } from "@/core/Dtos/AuthResult";
import { RegisterDto } from "@/core/Dtos/RegisterDto";
import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";

export async function registerAction(userModel: RegisterDto) {
  try {
    const result = await register(userModel);
    return result;
  } catch (err) {
    if (err instanceof AuthenticationError) {
      return {
        status: "failed",
        message: err.message,
        errors: err.errors,
        description: err.description,
      } as AuthResult;
    } else {
      return {
        message: "Unknown error",
        status: "failed",
      } as AuthResult;
    }
  }
}
