import { getAllBrandsAction } from "@/lib/server_actions/brandActions";
import { Injector } from "@/ui/react-query/injector";
import { ReactNode } from "react";

export const BRANDS_QUERY_KEY = "brands";
export async function BrandInjector({ children }: { children: ReactNode }) {
  return (
    <Injector queryFn={getAllBrandsAction} queryKey={BRANDS_QUERY_KEY}>
      {children}
    </Injector>
  );
}
