"use client";
import { ProductVariation } from "@/core/models/product";
import { ProductVariationModel } from "@/core/models/productModel";
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
  const [activeVariation, setActiveVariation] = useState(
    ProductVariationModel.CreateWith(variation),
  );

  return (
    <VariationContext.Provider
      value={{
        activeVariation,
        updateVariation: (_var) => {
          setActiveVariation(ProductVariationModel.CreateWith(_var));
        },
      }}
    >
      {children}
    </VariationContext.Provider>
  );
}
