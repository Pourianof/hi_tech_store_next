import { ZodError } from "zod";

export function zodToRhsError<T>(zodErr: ZodError<T>) {
  return zodErr.issues.map((issue) => ({
    message: issue.message,
    path: issue.path.join("."),
  }));
}
