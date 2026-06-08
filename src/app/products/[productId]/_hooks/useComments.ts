import { PagedResults } from "@/core/Dtos/pagedResult";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { Comment } from "@/core/models/comment";
import { Product } from "@/core/models/product";
import { getCommentsOfProductAction } from "@/lib/server_actions/productActions";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useComments({
  productId,
}: {
  productId: Product["productId"];
  page?: number;
}) {
  const { data, fetchNextPage, hasNextPage, isLoading, error, refetch } =
    useInfiniteQuery<PagedResults<Comment>, ProblemDetails>({
      refetchOnMount: true,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      queryKey: ["product-comment", productId],
      async queryFn({ pageParam = 1 }) {
        const result = await getCommentsOfProductAction(productId, {
          page: pageParam,
          limit: 10,
        });
        if (result.status == "failed") {
          throw result.data;
        }

        return result.data;
      },
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.pageNumber + 1 : null,
      initialPageParam: 1,
    });

  return { data, fetchNextPage, hasNextPage, isLoading, error, refetch };
}
