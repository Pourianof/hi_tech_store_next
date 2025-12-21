import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { Filters } from "@/core/models/filter";
import { apiRoutes } from "./apiRoutes";

export async function GetProductsFilters(
  categoryId?: number
): Promise<ResultModel<Filters>> {
  const url = new URL(apiRoutes.filters.base);
  if (typeof categoryId == "number") {
    url.searchParams.set("category", `${categoryId}`);
  }

  const respond = await fetch(url);

  return generateResultModelFromResponse(respond);
}
