import { OrderWithProduct } from "@/core/models/order";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";
import { fetchWrapper } from "./fetchWrapper";

export async function registerOrderApi(
  callbackUrl: string,
  discountCode?: string | null,
) {
  const searchParams = new URLSearchParams();

  if (discountCode) {
    searchParams.append("discountCode", discountCode);
  }

  return fetchWrapper.post<{ paymentCallbackUrl: string }>(
    `${apiRoutes.orders.base}?${searchParams.toString()}`,
    {
      paymentCallbackUrl: callbackUrl,
    },
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
