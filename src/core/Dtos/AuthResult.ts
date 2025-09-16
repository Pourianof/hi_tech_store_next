import { User } from "../models/user";

export type ProblemDetailErrors = { [key: string]: string[] };
export interface AuthResult {
  status: "failed" | "success";
  message: string;
  description?: string;
  user?: User;
  errors?: ProblemDetailErrors;
}
