"use client";

import { getQueryClient } from "@/ui/react-query/reactQueryConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function CCQueryClientProvider({ children }: { children: ReactNode }) {
  const client = getQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
