import { RegisterDto } from "@/core/Dtos/RegisterDto";
import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";

export async function signIn(email: string, password: string) {
  const response = await fetch(`${process.env.API_SERVER_ADDRESS}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = (await response.json()) as {
      token: string;
      user: {
        userName: string;
        email: string;
        firstName: string;
        lastName: string;
      };
    };

    return data;
  }

  const data = (await response.json()) as {
    title: string;
    detail?: string;
    errors?: { [key: string]: string[] }[];
  };

  throw new AuthenticationError(data.title, data.detail, data.errors);
}

export async function register(user: RegisterDto) {
  console.log(`${process.env.API_SERVER_ADDRESS}/register`);
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
