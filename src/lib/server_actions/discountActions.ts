"use server";
import {
  checkDiscountScriptApi,
  getAllDiscountsApi,
  getDiscountCodeByNameOrId,
  getDiscountEntities,
  getRandomCode,
  submitDiscountApi,
  submitDiscountCodeApi,
  updateDiscountApi,
} from "@/api/discountApi";
import {
  DiscountCodeCreationDto,
  DiscountCodeQuery,
  DiscountCreationDto,
} from "@/core/Dtos/discountCodeDto";
import { workWithSession } from "../helpers/sessionHelper";
import { DiscountConditionScriptCheckDto } from "@/core/Dtos/discountDto";
import { ProductModel } from "@/core/models/productModel";
import { ResultModel } from "@/core/models/resultModel";

export async function getDiscountEntitiesAction() {
  return getDiscountEntities();
}

export async function getRandomDiscountCodeAction() {
  return workWithSession((session) => getRandomCode(session.apiToken));
}

export async function getDiscountCodeByNameOrIdAction(name: string | number) {
  return workWithSession((session) =>
    getDiscountCodeByNameOrId(session.apiToken, name),
  );
}

export async function submitDiscountCodeAction(
  discountCode: DiscountCodeCreationDto,
) {
  return submitDiscountCodeApi(discountCode);
}

export async function submitDiscountAction(discountCode: DiscountCreationDto) {
  return submitDiscountApi(discountCode);
}

export async function getAllDiscountsAction(query?: DiscountCodeQuery) {
  return getAllDiscountsApi(query);
}

export const updateDiscountAction = updateDiscountApi;
export const checkDiscountScriptAction = async (
  scriptDto: DiscountConditionScriptCheckDto,
) => {
  const result = await checkDiscountScriptApi(scriptDto);

  if (result.status == "success") {
    result.data = result.data.map((p) => ProductModel.CreateWith(p));
  }

  return result as ResultModel<ProductModel[]>;
};
