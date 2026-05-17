"use client";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { Column } from "@/ui/layouts/column";
import { Caption } from "@/ui/theme/text/caption";
import { H3 } from "@/ui/theme/text/headers";
import { ProductBasicInfoForm } from "./sections/productBasicInfoForm";

export function UpdateProductForm({ product }: { product: ProductDto }) {
  return (
    <Column>
      <Column>
        <H3>Update product</H3>
        <Caption size="md">{product.title}</Caption>
      </Column>
      <ProductBasicInfoForm product={product} />
    </Column>
  );
}
