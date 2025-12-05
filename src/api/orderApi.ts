import { routes } from "@/app/routes";
import { generateResultModelFromResponse } from "./apiHelper";

const ORDER_URL = `${process.env.API_SERVER_ADDRESS}/orders`;

export async function registerOrderApi(apiToken: string) {
  return generateResultModelFromResponse<{ paymentCallbackUrl: string }>(
    await fetch(ORDER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentCallbackUrl: `http://localhost:3000${routes.order.orderPaymentConfirmation}`,
      }),
    })
  );
}
