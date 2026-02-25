import { updateDiscountAction } from "@/lib/server_actions/discountActions";
import { getQueryKeyForDiscountCode, useDiscountCode } from "./useDiscountCode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DiscountUpdateDto } from "@/core/Dtos/discountCodeDto";

export function useDiscountMutations(id: number) {
  const { data: discountCode, isLoading } = useDiscountCode(id);

  const query = useQueryClient();
  const { mutate: toggleActivation, isPending: isDeactivating } = useMutation({
    mutationFn: async (updateDto: DiscountUpdateDto) => {
      updateDiscountAction(id, updateDto);
    },
    onSuccess: () =>
      query.invalidateQueries({ queryKey: [getQueryKeyForDiscountCode(id)] }),
  });

  return { toggleActivation, isDeactivating, isLoading, discountCode };
}
