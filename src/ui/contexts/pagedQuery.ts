import { PagedResults } from "@/core/Dtos/pagedResult";
import { QueryParams } from "@/core/Dtos/QueryParams";
import { ResultModel } from "@/core/models/resultModel";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type QueryFn<TOut> = (
  query: QueryParams,
) => Promise<ResultModel<PagedResults<TOut>>>;

export function usePagedQuery<TOut>(
  queryFn: QueryFn<TOut>,
  key: string,
  initialData?: PagedResults<TOut>,
) {
  const [page, setPage] = useState(initialData?.pageNumber || 1);
  const [limit, setLimit] = useState(initialData?.pageSize || 10);

  const query = useQuery<PagedResults<TOut>>({
    queryKey: [key, page, limit],
    staleTime: 60 * 60 * 1000,
    queryFn: async () => {
      const result = await queryFn({ page, limit });

      if (result.status == "failed") {
        throw result.data;
      }

      return result.data;
    },
    initialData:
      page == initialData?.pageNumber && limit == initialData.pageSize
        ? initialData
        : undefined,
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

  return { query, page, nextPage, previousPage, changeLimit, limit };
}
