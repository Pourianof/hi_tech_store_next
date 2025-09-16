import { ProblemDetailErrors } from "@/core/Dtos/AuthResult";

export interface ProblemDetails {
  title: string;
  detail?: string;
  errors?: ProblemDetailErrors;
}
