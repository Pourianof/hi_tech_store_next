"use server";
import {
  getAllDiscountsApi,
  getDiscountCodeByNameOrId,
  getDiscountEntities,
  getRandomCode,
  submitDiscountCodeApi,
  updateDiscountApi,
} from "@/api/discountApi";
import { workWithSession } from "../helpers/sessionHelper";
import { DiscountCode } from "@/core/models/discount";

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

export async function submitDiscountCodeAction(discountCode: DiscountCode) {
  return submitDiscountCodeApi(discountCode);
}

export async function getAllDiscountsAction() {
  return getAllDiscountsApi();
}

export const updateDiscountAction = updateDiscountApi;
