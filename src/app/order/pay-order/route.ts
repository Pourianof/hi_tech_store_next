import { registerOrderApi } from "@/api/orderApi";
import { workWithSession } from "@/lib/helpers/sessionHelper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const discountCode = searchParams.get("discountCode");

  // register order with pending status and recieve payment url
  const result = await workWithSession(async (session) => {
    return registerOrderApi(session.apiToken, discountCode);
  });

  if (result.status === "success") {
    return Response.redirect(result.data.paymentCallbackUrl, 302);
  }

  return new Response(JSON.stringify(result), { status: 400 });
}
