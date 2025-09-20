import { ProblemDetails } from "../errors/AuthErrors/ProblemDetails";

type SuccessResult<T> = {
  status: "success";
  statusCode: number;
  data: T;
};

type FailedResult = {
  status: "failed";
  statusCode: number;
  data: ProblemDetails;
};

export type ResultModel<T = unknown> = SuccessResult<T> | FailedResult;
