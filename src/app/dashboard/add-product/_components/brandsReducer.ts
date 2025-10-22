import {
  createNewBrandModelAction,
  getAllBrandsAction,
} from "@/lib/server_actions/brandActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BRANDS_QUERY_KEY } from "./brandProvider";

export function useBrands() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [BRANDS_QUERY_KEY],
    queryFn: async () => {
      const result = await getAllBrandsAction();
      if (result.status == "failed") {
        throw result;
      }

      return result.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: (newBrandModel: FormData) => {
      return createNewBrandModelAction(newBrandModel);
    },
    onSuccess: (data) => {
      if (data.status == "success") {
        queryClient.invalidateQueries({ queryKey: [BRANDS_QUERY_KEY] });
      }
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    error: query.error,
    isReady: !query.isLoading && !query.isError,
    actions: {
      add(newBrandModel: FormData) {
        return addMutation.mutateAsync(newBrandModel);
      },
    },
  };
}
