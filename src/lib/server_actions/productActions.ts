"use server";
import { createNewProduct } from "@/api/productApi";
import { ResultModel } from "@/core/models/resultModel";
import { workWithSession } from "../helpers/sessionHelper";

export async function createProduct(product: FormData): Promise<ResultModel> {
  return workWithSession((session) => {
    return createNewProduct(product, session.apiToken);
  });
}
