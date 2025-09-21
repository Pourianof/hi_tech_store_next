"use client";

import { Product } from "@/core/models/product";
import { createContext, ReactNode, useContext } from "react";

const ProductContext = createContext<Product>({} as Product);

export function useProduct() {
  const product = useContext(ProductContext);

  if (!product) {
    throw new Error("No product exposed by context at upper tree");
  }

  return product;
}

export function ProductProvider({
  children,
  product,
}: {
  product: Product;
  children: ReactNode;
}) {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}
