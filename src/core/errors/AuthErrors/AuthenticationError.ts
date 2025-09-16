import { ProblemDetailErrors } from "@/core/Dtos/AuthResult";
import { AuthError } from "next-auth";

export class AuthenticationError extends AuthError {
  errors?: ProblemDetailErrors;
  description?: string;
  constructor(
    message: string,
    description?: string,
    errors?: ProblemDetailErrors
  ) {
    super(message);
    this.message = message;
    this.name = "AuthenticationError";
    this.errors = errors;
    this.description = description;
  }
}
