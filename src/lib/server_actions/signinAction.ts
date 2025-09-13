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
      message,
      errors: err instanceof AuthenticationError ? err.errors : undefined,
      description,
    };
  }
}
