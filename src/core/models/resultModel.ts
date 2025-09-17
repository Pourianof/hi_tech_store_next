import { ProblemDetails } from "../errors/AuthErrors/ProblemDetails";

export interface ResultModel<T = unknown> {
  status: "failed" | "success";
  statusCode: number;
  data: ProblemDetails | T;
}
