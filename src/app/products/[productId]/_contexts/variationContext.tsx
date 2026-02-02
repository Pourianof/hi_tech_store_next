"use client";
import { ProductVariation } from "@/core/models/product";
import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";
import { createContext, ReactNode, useContext, useState } from "react";

interface VariationState {
  activeVariation: ProductVariation;
  updateVariation: (variation: ProductVariation) => void;
}

const VariationContext = createContext<VariationState>(
  {} as never as VariationState,
);

export function useActiveVariation() {
  const variation = useContext(VariationContext);

  if (!variation) {
    throw new NoContextDefinedError("VariationContext");
  }

  return variation;
}

export function VariationProvider({
  children,
  variation,
}: {
  variation: ProductVariation;
  children: ReactNode;
}) {
  const [activeVariation, setActiveVariation] = useState(variation);

  return (
    <VariationContext.Provider
      value={{ activeVariation, updateVariation: setActiveVariation }}
    >
      {children}
    </VariationContext.Provider>
  );
}
