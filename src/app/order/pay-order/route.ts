import { registerOrderApi } from "@/api/orderApi";
import { routes } from "@/app/routes";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const discountCode = searchParams.get("discountCode");

  const callbackUrl = new URL(url.origin);
  callbackUrl.pathname = routes.order.orderPaymentConfirmation;

  // register order with pending status and recieve payment url
  const result = await registerOrderApi(callbackUrl.href, discountCode);

  if (result.status === "success") {
    return Response.redirect(result.data.paymentCallbackUrl, 302);
  }

  return new Response(JSON.stringify(result), { status: 400 });
}
