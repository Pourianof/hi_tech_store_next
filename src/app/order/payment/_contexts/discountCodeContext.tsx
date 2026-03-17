"use client";
import { DiscountAction } from "@/core/models/discount";
import { createContext, ReactNode, useContext, useState } from "react";

type AppliedDiscount = {
  code: string;
  action: DiscountAction;
};

interface DiscountCodeState {
  discount?: AppliedDiscount;
  setDiscountCode: (code: string, action: DiscountAction) => void;
}

const DiscountCodeContext = createContext<DiscountCodeState>(
  {} as unknown as DiscountCodeState,
);

export function useDiscountCodeContext(): DiscountCodeState | undefined {
  const context = useContext(DiscountCodeContext);

  return context;
}

export function DiscountCodeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [discount, setDiscount] = useState<AppliedDiscount>();

  function onDiscountCodeSet(code: string, action: DiscountAction) {
    if (discount?.code != code) {
      setDiscount({ code, action });
    }
  }

  return (
    <DiscountCodeContext.Provider
      value={{ setDiscountCode: onDiscountCodeSet, discount }}
    >
      {children}
    </DiscountCodeContext.Provider>
  );
}
