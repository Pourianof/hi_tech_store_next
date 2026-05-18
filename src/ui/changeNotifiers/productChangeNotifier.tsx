"use client";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { ChangeNotifierIml } from "@/lib/changeNotifier/changeNofier";
import { ReactNode } from "react";
import { NotifierProvider, useNotifier } from "./notifierProvider";
import { ProductVariationChangeNotifier } from "./productVariationChangeNotifier";

export class ProductChangeNotifier extends ChangeNotifierIml {
  private readonly _product: Omit<ProductDto, "variations"> & {
    variations: ProductVariationChangeNotifier[];
  };

  constructor(product: ProductDto) {
    super();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._product = { ...product };
    this._product.variations = product.variations.map(
      (p) => new ProductVariationChangeNotifier(p),
    );
  }

  get product() {
    return this._product;
  }
}

export function ProductConsumer({
  builder,
}: {
  builder(product?: ProductChangeNotifier): ReactNode;
}) {
  const pvNotifier = useNotifier(ProductChangeNotifier);

  return builder(pvNotifier);
}

export function ProductChangeNotifierProvider({
  children,
  product,
}: {
  children: ReactNode;
  product: ProductDto;
}) {
  return (
    <NotifierProvider changeNotifier={new ProductChangeNotifier(product)}>
      {children}
    </NotifierProvider>
  );
}
