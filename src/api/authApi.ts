import { LoginDto } from "@/core/Dtos/LoginDto";
import { RegisterDto } from "@/core/Dtos/RegisterDto";
import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";

export async function signIn(
  id: {
    email?: string;
    username?: string;
  },
  password: string
) {
  const response = await fetch(`${process.env.API_SERVER_ADDRESS}/login`, {
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
  const result = await fetch(`${process.env.API_SERVER_ADDRESS}/register`, {
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
