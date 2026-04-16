import { LoginDto } from "@/core/Dtos/LoginDto";
import { RegisterDto } from "@/core/Dtos/RegisterDto";
import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";

export async function signIn(
  id: {
    email?: string;
    username?: string;
  },
  password: string,
) {
  const response = await fetch(apiRoutes.auth.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...id, password }),
  });

  if (response.ok) {
    const data: LoginDto = await response.json();

    return data;
  }

  const data: ProblemDetails = await response.json();

  throw new AuthenticationError(data.title, data.detail, data.errors);
}

export async function register(user: RegisterDto) {
  const result = await fetch(apiRoutes.auth.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const body = await result.json();
  if (result.ok) {
    return body;
  }

  throw new AuthenticationError(body.title, body.detail, body.errors);
}

// use raw fetch instead of fetchWrapper because the fetchWrapper
// stuck in a infinite function call cycle by request session(jwt)
// and then call refreshTheTokenApi again.
export async function refreshTheTokenApi(refToken: string) {
  const finalUrl = new URL(apiRoutes.auth.refresh);
  finalUrl.searchParams.append("refreshToken", refToken);

  const response = await fetch(finalUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result =
    await generateResultModelFromResponse<RefTokenResult>(response);

  return result;
}

type RefTokenResult = { token: string; expiresAt: string };

export async function logoutApi(refToken: string) {
  const finalUrl = new URL(apiRoutes.auth.logout);
  finalUrl.searchParams.append("refreshToken", refToken);

  const response = await fetch(finalUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await generateResultModelFromResponse<void>(response);

  return result;
}
