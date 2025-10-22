import {
  dehydrate,
  HydrationBoundary,
  QueryFunction,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { getQueryClient } from "./reactQueryConfig";
import { ResultModel } from "@/core/models/resultModel";

export async function Injector<T>({
  children,
  queryFn,
  queryKey,
}: {
  children: ReactNode;
  queryKey: string;
  queryFn: QueryFunction<T>;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKey],
    queryFn,
  });

  const data = queryClient.getQueryData([queryKey]) as ResultModel;
  const query = queryClient.getQueryCache().find({ queryKey: [queryKey] });
  if (query) {
    if (data.status == "failed") {
      query.setState({
        data: undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: data.data as any,
        status: "error",
        fetchStatus: "idle",
      });
    } else {
      query.setState({
        data: data.data,
        status: "success",
        fetchStatus: "idle",
      });
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
