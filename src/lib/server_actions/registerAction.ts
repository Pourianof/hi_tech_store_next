"use server";
import { register } from "@/api/authApi";
import { RegisterDto } from "@/core/Dtos/RegisterDto";
import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";
import { ResultModel } from "@/core/models/resultModel";

export async function registerAction(
  userModel: RegisterDto
): Promise<ResultModel> {
  try {
    const result = await register(userModel);
    return result;
  } catch (err) {
    if (err instanceof AuthenticationError) {
      return {
        status: "failed",
        statusCode: 400,
        data: {
          errors: err.errors,
          detail: err.description,
          title: err.message,
        },
      };
    } else {
      return {
        status: "failed",
        statusCode: 400,
        data: {
          title: "Unknown error",
        },
      };
    }
  }
}
