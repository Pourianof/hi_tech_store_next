import { PagedResults } from "@/core/Dtos/pagedResult";
import { QueryParams } from "@/core/Dtos/QueryParams";
import { OrderWithProduct } from "@/core/models/order";
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

export async function getUserOrders(searchParams: QueryParams) {
  return fetchWrapper.get<PagedResults<OrderWithProduct>>(
    apiRoutes.orders.base,
    searchParams,
  );
}
