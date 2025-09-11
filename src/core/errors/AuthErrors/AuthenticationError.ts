import { AuthError } from "next-auth";

export class AuthenticationError extends AuthError {
  errors?: { [key: string]: string[] }[];
  description?: string;
  constructor(
    message: string,
    description?: string,
    errors?: { [key: string]: string[] }[]
  ) {
    super(message);
    this.message = message;
    this.name = "AuthenticationError";
    this.errors = errors;
    this.description = description;
  }
}
