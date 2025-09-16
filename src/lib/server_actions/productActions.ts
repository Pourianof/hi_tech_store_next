"use server";
import { createNewProduct } from "@/api/productApi";
import { auth } from "../../../auth";
import { ResultModel } from "@/core/models/resultModel";

export async function createProduct(product: FormData): Promise<ResultModel> {
  const session = await auth();
  if (!session?.apiToken) {
    return {
      status: "failed",
      statusCode: 401,
      data: {
        title: "no active session",
        detail: "it seems you are not logged in. Log-in and try again",
      },
    };
  }

  return createNewProduct(product, session.apiToken);
}
