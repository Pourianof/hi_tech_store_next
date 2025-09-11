import { User } from "../models/user";

export interface AuthResult {
  status: "failed" | "success";
  message: string;
  description?: string;
  user?: User;
  errors?: { [key: string]: string[] }[];
}
