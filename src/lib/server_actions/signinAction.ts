"use server";

import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";
import { CREDENTIAL_PROVIDER_ID, signIn } from "../../../auth";
import { ResultModel } from "@/core/models/resultModel";

export async function signinAction(
  emailOrUsername: string,
  password: string
): Promise<ResultModel> {
  try {
    await signIn(CREDENTIAL_PROVIDER_ID, {
      ...(emailOrUsername.includes("@")
        ? { email: emailOrUsername }
        : { username: emailOrUsername }),
      password,
      redirect: false,
    });

    // return state instead of redirect to let frontend to update SessionProvider context
    return {
      status: "success",
      statusCode: 200,
      data: {},
    };
  } catch (err) {
    if ((err as Error).message == "NEXT_REDIRECT") {
      throw err;
    }

    let message: string;
    let description: string | undefined;
    if (err instanceof AuthenticationError) {
      description = err.description;
      message = err.message;
    } else if (
      (err as { cause?: { code: string } }).cause?.code == "ECONNREFUSED"
    ) {
      message = "Could not connect to api server.";
      description = "The server is down.\nWe are trying to fix it.\nTry later";
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = "Unknown error";
    }

    return {
      status: "failed",
      statusCode: 400,
      data: {
        title: message,
        errors: err instanceof AuthenticationError ? err.errors : undefined,
        detail: description,
      },
    };
  }
}
