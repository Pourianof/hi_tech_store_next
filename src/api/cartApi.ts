import { Cart, CartWithProduct } from "@/core/models/cart";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";

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
  console.log("Getting cart with token: ");
  const respond = await fetch(apiRoutes.carts.base, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Response: ", respond.status);

  return generateResultModelFromResponse<CartWithProduct>(respond);
}
