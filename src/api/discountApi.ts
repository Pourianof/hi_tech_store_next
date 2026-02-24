import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";
import { DiscountCode, DiscountEntity } from "@/core/models/discount";
import { fetchWrapper } from "./fetchWrapper";

export async function getDiscountEntities(): Promise<
  ResultModel<DiscountEntity[]>
> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.discounts.entities),
  );
}

export async function getDiscountCodeByName(
  apiToken: string,
  name: string,
): Promise<ResultModel<DiscountCode>> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.discounts.forCode(name), {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    }),
  );
}

export async function getRandomCode(
  apiToken: string,
): Promise<ResultModel<{ code: string }>> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.discounts.randomCode, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    }),
  );
}

export async function submitDiscountCodeApi(discountCode: DiscountCode) {
  return fetchWrapper.post<DiscountCode>(
    apiRoutes.discounts.codes,
    discountCode,
  );
}
