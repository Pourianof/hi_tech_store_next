"use client";

import { useAppContext } from "@/ui/contexts/useAppContext";
import { createContext, ReactNode } from "react";

const DiscountFormContext = createContext({
  isDiscountCodeForm: false,
});

export function useDiscountFormContext() {
  return useAppContext(DiscountFormContext);
}

export function DiscountFormProvider({
  children,
  isDiscountCode,
}: {
  children: ReactNode;
  isDiscountCode?: boolean;
}) {
  return (
    <DiscountFormContext.Provider
      value={{
        isDiscountCodeForm: !!isDiscountCode,
      }}
    >
      {children}
    </DiscountFormContext.Provider>
  );
}
