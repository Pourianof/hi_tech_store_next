"use server";
import {
  getDiscountCodeByName,
  getDiscountEntities,
  getRandomCode,
} from "@/api/discountApi";
import { workWithSession } from "../helpers/sessionHelper";

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
