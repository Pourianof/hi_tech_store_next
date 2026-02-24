"use server";
import {
  getDiscountCodeByName,
  getDiscountEntities,
  getRandomCode,
  submitDiscountCodeApi,
} from "@/api/discountApi";
import { workWithSession } from "../helpers/sessionHelper";
import { DiscountCode } from "@/core/models/discount";

export async function getDiscountEntitiesAction() {
  return getDiscountEntities();
}

export async function getRandomDiscountCodeAction() {
  return workWithSession((session) => getRandomCode(session.apiToken));
}

export async function getDiscountCodeByNameAction(name: string) {
  return workWithSession((session) =>
    getDiscountCodeByName(session.apiToken, name),
  );
}

export async function submitDiscountCodeAction(discountCode: DiscountCode) {
  return submitDiscountCodeApi(discountCode);
}
