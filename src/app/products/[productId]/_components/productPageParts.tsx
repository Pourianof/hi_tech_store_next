import { Product } from "@/core/models/product";
import { TechnicalDetailsTable } from "./technicalDetailsTable";
import { SimilarProducts } from "./similarProducts";
import { ProductPagePartsTabs } from "./productPagePartsTabs";
import { ProductComments } from "./productComments";

export function ProductPageParts({ product }: { product: Product }) {
  return (
    <div>
      <ProductPagePartsTabs />
      <TechnicalDetailsTable product={product} />
      <SimilarProducts />
      <ProductComments />
    </div>
  );
}
