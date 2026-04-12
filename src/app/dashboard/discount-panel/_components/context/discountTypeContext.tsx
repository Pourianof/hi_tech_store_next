"use client";

import { useAppContext } from "@/ui/contexts/useAppContext";
import { createContext, ReactNode } from "react";

const DiscountTypeContext = createContext({
  isDiscountCodeForm: false,
});

export function useDiscountTypeContext() {
  return useAppContext(DiscountTypeContext);
}

export function DiscountTypeProvider({
  children,
  isDiscountCode,
}: {
  children: ReactNode;
  isDiscountCode?: boolean;
}) {
  return (
    <DiscountTypeContext.Provider
      value={{
        isDiscountCodeForm: !!isDiscountCode,
      }}
    >
      {children}
    </DiscountTypeContext.Provider>
  );
}
