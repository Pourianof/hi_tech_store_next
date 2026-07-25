import { PagedResults } from "@/core/Dtos/pagedResult";
import { QueryParams } from "@/core/Dtos/QueryParams";
import { ResultModel } from "@/core/models/resultModel";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export type QueryFn<TOut, TQuery extends object = object> = (
  query: QueryParams<TQuery>,
) => Promise<ResultModel<PagedResults<TOut>>>;

export interface PagedQueryResult<TOut, TQuery> {
  query: UseQueryResult<PagedResults<TOut>, Error>;
  page: number;
  nextPage: VoidFunction;
  previousPage: VoidFunction;
  changeLimit: (newLimit: number) => void;
  limit: number;
  filters: TQuery;
  setFilters: (filters: TQuery) => void;
}

export function usePagedQuery<TOut, TQuery extends object = object>(
  queryFn: QueryFn<TOut, TQuery>,
  key: string,
  initialData?: PagedResults<TOut>,
  initialFilters?: TQuery,
): PagedQueryResult<TOut, TQuery> {
  const [page, setPage] = useState(initialData?.pageNumber || 1);
  const [limit, setLimit] = useState(initialData?.pageSize || 10);
  const [filters, setFilters] = useState<TQuery>(
    initialFilters ?? ({} as TQuery),
  );

  const filtersKey = useMemo(
    () => JSON.stringify(filters, Object.keys(filters).sort()),
    [filters],
  );

  const initialFiltersKey = useMemo(
    () =>
      JSON.stringify(
        initialFilters ?? ({} as TQuery),
        Object.keys(initialFilters ?? {}).sort(),
      ),
    [initialFilters],
  );

  const isInitialQuery =
    initialData != null &&
    page === initialData.pageNumber &&
    limit === initialData.pageSize &&
    filtersKey === initialFiltersKey;

  const query = useQuery<PagedResults<TOut>>({
    queryKey: [key, page, limit, filtersKey],
    staleTime: 60 * 60 * 1000,
    queryFn: async () => {
      const result = await queryFn({
        page,
        limit,
        ...filters,
      } as QueryParams<TQuery>);

      if (result.status == "failed") {
        throw result.data;
      }

      return result.data;
    },
    initialData: isInitialQuery ? initialData : undefined,
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

  function applyFilters(newFilters: TQuery) {
    setPage(1);
    setFilters(newFilters);
  }

  return {
    query,
    page,
    nextPage,
    previousPage,
    changeLimit,
    limit,
    filters,
    setFilters: applyFilters,
  };
}
