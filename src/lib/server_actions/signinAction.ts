"use server";

import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";
import { auth, CREDENTIAL_PROVIDER_ID, signIn } from "../../../auth";

export async function signinAction(email: string, password: string) {
  try {
    await signIn(CREDENTIAL_PROVIDER_ID, {
      email,
      password,
      redirect: false,
    });
    const session = await auth();
    return session?.user;
  } catch (err) {
    return {
      status: "failed",
      message:
        err instanceof AuthenticationError ? err.message : "Unknown error",
      errors: err instanceof AuthenticationError ? err.errors : [],
      description:
        err instanceof AuthenticationError ? err.description : undefined,
    };
  }
}
