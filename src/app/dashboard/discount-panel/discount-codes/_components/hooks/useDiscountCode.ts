"use client";
import { DiscountCode } from "@/core/models/discount";
import { getDiscountCodeByNameOrIdAction } from "@/lib/server_actions/discountActions";
import { useQuery } from "@tanstack/react-query";

export function getQueryKeyForDiscountCode(id: number) {
  return `dc-${id}`;
}

export function useDiscountCode(
  discountId: number,
  initialDiscount?: DiscountCode,
) {
  return useQuery({
    queryKey: [getQueryKeyForDiscountCode(discountId)],
    queryFn: async () => {
      const result = await getDiscountCodeByNameOrIdAction(discountId);

      if (result.status == "failed") {
        throw result.data;
      }

      return result.data;
    },

    initialData: initialDiscount,
    staleTime: 60 * 60 * 1000, // 1hr
  });
}
