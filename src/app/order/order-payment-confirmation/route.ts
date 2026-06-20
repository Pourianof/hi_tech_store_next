import { generateResultModelFromResponse } from "@/api/apiHelper";
import { apiRoutes } from "@/api/apiRoutes";
import { routes } from "@/app/routes";

const CONFIRM_URL_KEY_QS = "key";
const CONFIRM_URL_CONFIRM_KEY_QS = "confirm_key";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get(CONFIRM_URL_KEY_QS) || "";
  const confirmKey = url.searchParams.get(CONFIRM_URL_CONFIRM_KEY_QS) || "";

  const apiUrl = new URL(apiRoutes.orders.orderPaymentConfirmation);
  apiUrl.searchParams.append(CONFIRM_URL_KEY_QS, key);
  apiUrl.searchParams.append(CONFIRM_URL_CONFIRM_KEY_QS, confirmKey);

  const result = await generateResultModelFromResponse(
    await fetch(apiUrl, {
      method: "GET",
    }),
  );

  const appUrl = new URL(url.origin);

  if (result.status === "success") {
    appUrl.pathname = routes.order.succeedPayment;
    return Response.redirect(appUrl, 302);
  }

  appUrl.pathname = routes.order.failedPayment;
  return Response.redirect(appUrl, 302);
}
