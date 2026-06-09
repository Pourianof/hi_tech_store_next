import {
  DiscountCodeCreationDto,
  DiscountCodeQuery,
  DiscountCreationDto,
  DiscountUpdateDto,
} from "@/core/Dtos/discountCodeDto";
import { DiscountConditionScriptCheckDto } from "@/core/Dtos/discountDto";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { Discount, DiscountCode, DiscountEntity } from "@/core/models/discount";
import { Product } from "@/core/models/product";
import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";
import { fetchWrapper } from "./fetchWrapper";

export async function getDiscountEntities(): Promise<
  ResultModel<PagedResults<DiscountEntity>>
> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.discounts.entities),
  );
}

export async function getDiscountCodeByNameOrId<T extends string | number>(
  name: T,
): Promise<ResultModel<T extends number ? DiscountCode : DiscountCode[]>> {
  return fetchWrapper.get(apiRoutes.discounts.forCode(name));
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
    apiRoutes.discounts.base,
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
  return fetchWrapper.post<Product[]>(
    apiRoutes.discounts.scriptCheck,
    scriptDto,
  );
}
