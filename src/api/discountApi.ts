import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";
import { DiscountEntity } from "@/core/models/discount";

export async function getDiscountEntities(): Promise<
  ResultModel<DiscountEntity[]>
> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.discounts.entities),
  );
}
