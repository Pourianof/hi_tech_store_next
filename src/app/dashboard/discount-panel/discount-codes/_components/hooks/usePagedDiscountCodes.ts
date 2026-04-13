import { PagedResults } from "@/core/Dtos/pagedResult";
import { DiscountCode } from "@/core/models/discount";
import { getAllDiscountsAction } from "@/lib/server_actions/discountActions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function usePagedDiscountCodes({
  initialData,
  key,
}: {
  initialData?: PagedResults<DiscountCode>;
  key: string;
}) {
  const [page, setPage] = useState(initialData?.pageNumber ?? 1);
  const [limit, setLimit] = useState(initialData?.pageSize ?? 10);

  const query = useQuery<PagedResults<DiscountCode>>({
    queryKey: [key, page, limit],
    staleTime: 60 * 60 * 1000,
    queryFn: async () => {
      const result = await getAllDiscountsAction({ page, limit });

      if (result.status == "failed") {
        throw result.data;
      }

      return result.data;
    },
    initialData: page == 1 ? initialData : undefined,
  });

  function nextPage() {
    if (query.data && query.data?.totalPages <= page) {
      return;
    }

    setPage((page) => page + 1);
  }

  function previousPage() {
    if (query.data && page <= 1) {
      return;
    }

    setPage((page) => page - 1);
  }

  function changeLimit(limit: number) {
    if (limit > 25) {
      return;
    }

    setLimit(limit);
  }

  return { query, page, nextPage, previousPage, changeLimit };
}
