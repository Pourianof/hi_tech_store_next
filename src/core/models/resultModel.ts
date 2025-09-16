import { ProblemDetails } from "../errors/AuthErrors/ProblemDetails";

export interface ResultModel {
  status: "failed" | "success";
  statusCode: number;
  data: ProblemDetails | Record<string, unknown>;
}
