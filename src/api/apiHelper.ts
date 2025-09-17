import { ResultModel } from "@/core/models/resultModel";

export async function generateResultModelFromResponse<T>(
  response: Response,
  hasBody: boolean = true
) {
  return {
    status: response.ok ? "success" : "failed",
    statusCode: response.status,
    data: hasBody ? await response.json() : undefined,
  } as ResultModel<T>;
}
