import { Session } from "next-auth";
import { auth } from "../../../auth";
import { ResultModel } from "@/core/models/resultModel";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { revalidatePath } from "next/cache";

export async function workWithSession<T = Record<string, unknown>>(
  onSessionExist: (session: Session) => Promise<ResultModel<T>>,
  invalidateTags?: string[]
) {
  const session = await auth();
  if (!session?.apiToken) {
    return {
      status: "failed",
      statusCode: 401,
      data: {
        title: "no active session",
        detail: "it seems you are not logged in. Log-in and try again",
      },
    } as ResultModel<ProblemDetails>;
  }

  const result = await onSessionExist(session);

  invalidateTags?.forEach((t) => revalidatePath(t));

  return result;
}
