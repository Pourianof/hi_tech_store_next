import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";
import { Discount, DiscountCode, DiscountEntity } from "@/core/models/discount";
import { fetchWrapper } from "./fetchWrapper";
import {
  DiscountCodeCreationDto,
  DiscountCodeQuery,
  DiscountCreationDto,
  DiscountUpdateDto,
} from "@/core/Dtos/discountCodeDto";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { DiscountConditionScriptCheckDto } from "@/core/Dtos/discountDto";
import { Product } from "@/core/models/product";

export async function getDiscountEntities(): Promise<
  ResultModel<PagedResults<DiscountEntity>>
> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.discounts.entities),
  );
}

export async function getDiscountCodeByNameOrId(
  apiToken: string,
  name: string | number,
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

export async function submitDiscountApi(discount: DiscountCreationDto) {
  return fetchWrapper.post<Discount>(apiRoutes.discounts.base, discount);
}

export async function submitDiscountCodeApi(
  discountCode: DiscountCodeCreationDto,
) {
  return fetchWrapper.post<DiscountCode>(
    apiRoutes.discounts.codes,
    discountCode,
  );
}

export async function getAllDiscountsApi(query?: DiscountCodeQuery) {
  return fetchWrapper.get<PagedResults<DiscountCode>>(
    apiRoutes.discounts.codes,
    query,
  );
}

export async function updateDiscountApi(
  codeId: number,
  updateDto: DiscountUpdateDto,
) {
  return fetchWrapper.patch<DiscountCode>(
    apiRoutes.discounts.forCode(codeId),
    updateDto,
  );
}

export async function checkDiscountScriptApi(
  scriptDto: DiscountConditionScriptCheckDto,
) {
  console.log(apiRoutes.discounts.scriptCheck);
  return fetchWrapper.post<Product[]>(
    apiRoutes.discounts.scriptCheck,
    scriptDto,
  );
}
