import { generateResultModelFromResponse } from "@/api/apiHelper";
import { routes } from "@/app/routes";

const ORDER_CONFIRM_URL = `${process.env.API_SERVER_ADDRESS}/orders/order-payment-confirmation`;

const CONFIRM_URL_KEY_QS = "key";
const CONFIRM_URL_CONFIRM_KEY_QS = "confirm_key";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get(CONFIRM_URL_KEY_QS) || "";
  const confirmKey = url.searchParams.get(CONFIRM_URL_CONFIRM_KEY_QS) || "";

  const apiUrl = new URL(ORDER_CONFIRM_URL);
  apiUrl.searchParams.append(CONFIRM_URL_KEY_QS, key);
  apiUrl.searchParams.append(CONFIRM_URL_CONFIRM_KEY_QS, confirmKey);

  const result = await generateResultModelFromResponse(
    await fetch(apiUrl, {
      method: "GET",
    })
  );

  if (result.status === "success") {
    return Response.redirect(
      `http://localhost:3000${routes.order.succeedPayment}`,
      302
    );
  }

  return Response.redirect(
    `http://localhost:3000${routes.order.failedPayment}`,
    302
  );
}
