"use client";

import { DiscountType } from "@/core/Dtos/discountCodeDto";
import { useAppContext } from "@/ui/contexts/useAppContext";
import { createContext, ReactNode } from "react";

const DiscountTypeContext = createContext({
  isDiscountCodeForm: false, // for backward compability
  category: DiscountType.All,
});

export function useDiscountTypeContext() {
  return useAppContext(DiscountTypeContext);
}

export function DiscountTypeProvider({
  children,
  isDiscountCode,
  category,
}: {
  children: ReactNode;
  isDiscountCode?: boolean;
  category?: DiscountType;
}) {
  return (
    <DiscountTypeContext.Provider
      value={{
        isDiscountCodeForm: category
          ? category == DiscountType.Codes
          : !!isDiscountCode,
        category: category
          ? category
          : isDiscountCode
            ? DiscountType.Codes
            : DiscountType.All,
      }}
    >
      {children}
    </DiscountTypeContext.Provider>
  );
}
