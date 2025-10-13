import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { Filters } from "@/core/models/filter";

const API_URL = `${process.env.API_SERVER_ADDRESS}/filters`;

export async function GetProductsFilters(
  categoryId?: number
): Promise<ResultModel<Filters>> {
  const url = new URL(API_URL);
  if (typeof categoryId == "number") {
    url.searchParams.set("category", `${categoryId}`);
  }

  const respond = await fetch(url);

  return generateResultModelFromResponse(respond);
}
