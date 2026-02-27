"use server";
import {
  getAllDiscountsApi,
  getDiscountCodeByNameOrId,
  getDiscountEntities,
  getRandomCode,
  submitDiscountCodeApi,
  updateDiscountApi,
} from "@/api/discountApi";
import {
  DiscountCodeCreationDto,
  DiscountCodeQuery,
} from "@/core/Dtos/discountCodeDto";
import { workWithSession } from "../helpers/sessionHelper";

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

export async function getAllDiscountsAction(query?: DiscountCodeQuery) {
  return getAllDiscountsApi(query);
}

export const updateDiscountAction = updateDiscountApi;
