"use server";

import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";
import { CREDENTIAL_PROVIDER_ID, signIn } from "../../../auth";
import { redirect, RedirectType } from "next/navigation";

export async function signinAction(email: string, password: string) {
  try {
    await signIn(CREDENTIAL_PROVIDER_ID, {
      email,
      password,
      redirect: false,
    });

    const url = new URL(process.env.AUTH_URL as string);
    url.pathname = "/";
    redirect(url.toString(), RedirectType.push);
  } catch (err) {
    if ((err as Error).message == "NEXT_REDIRECT") {
      throw err;
    }

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
