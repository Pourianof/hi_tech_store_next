"use server";
import {
  checkDiscountCodeUsabilityApi,
  getCart,
  updateCart,
} from "@/api/cartApi";
import { workWithSession } from "../helpers/sessionHelper";
import { Cart } from "@/core/models/cart";

export async function getCartAction() {
  return workWithSession(async (session) => {
    return getCart(session.apiToken);
  });
}

export async function updateCartAction(cart: Cart) {
  return workWithSession(async (session) => {
    return updateCart(cart, session.apiToken);
  });
}

export async function checkDiscountCodeUsabilityAction(discountCode: string) {
  return checkDiscountCodeUsabilityApi(discountCode);
}
