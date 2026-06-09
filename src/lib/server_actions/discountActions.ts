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

export async function getDiscountEntitiesAction() {
  return getDiscountEntities();
}

export async function getRandomDiscountCodeAction() {
  return workWithSession((session) => getRandomCode(session.apiToken));
}

export const getDiscountCodeByNameOrIdAction = getDiscountCodeByNameOrId;

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
export const checkDiscountScriptAction = checkDiscountScriptApi;
