import { routes } from "@/app/routes";
import { OrderWithProduct } from "@/core/models/order";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";

export async function registerOrderApi(
  apiToken: string,
  discountCode?: string | null,
) {
  const searchParams = new URLSearchParams();

  if (discountCode) {
    searchParams.append("discountCode", discountCode);
  }

  return generateResultModelFromResponse<{ paymentCallbackUrl: string }>(
    await fetch(`${apiRoutes.orders.base}?${searchParams.toString()}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentCallbackUrl: `http://localhost:3000${routes.order.orderPaymentConfirmation}`,
      }),
    }),
  );
}

export async function getUserOrders(apiToken: string) {
  return generateResultModelFromResponse<OrderWithProduct[]>(
    await fetch(apiRoutes.orders.base, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    }),
  );
}
