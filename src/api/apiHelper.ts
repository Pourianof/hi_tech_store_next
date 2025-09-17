import { ResultModel } from "@/core/models/resultModel";

export async function generateResultModelFromResponse<T>(response: Response) {
  let json: unknown;
  try {
    json = await response.json();
  } catch {}

  return {
    status: response.ok ? "success" : "failed",
    statusCode: response.status,
    data: json
      ? (json as T)
      : !response.ok
      ? { title: response.statusText }
      : undefined,
  } as ResultModel<T>;
}
