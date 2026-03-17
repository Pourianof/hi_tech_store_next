import { Cart, CartWithProduct } from "@/core/models/cart";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";
import { fetchWrapper } from "./fetchWrapper";
import { DiscountCodeCheckResultDto } from "@/core/Dtos/discountCodeDto";

export async function updateCart(cart: Cart, token: string) {
  const respond = await fetch(apiRoutes.carts.items, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cart),
  });

  return generateResultModelFromResponse<CartWithProduct>(respond);
}

export async function getCart(token: string) {
  const respond = await fetch(apiRoutes.carts.base, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return generateResultModelFromResponse<CartWithProduct>(respond);
}

export async function checkDiscountCodeUsabilityApi(discountCode: string) {
  return fetchWrapper.get<DiscountCodeCheckResultDto>(
    apiRoutes.carts.discountState,
    {
      discountCode,
    },
  );
}
