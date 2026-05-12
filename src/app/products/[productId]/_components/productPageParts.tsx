import { Product } from "@/core/models/product";
import { TechnicalDetailsTable } from "./technicalDetailsTable";
import { SimilarProducts } from "./similarProducts";
import { ProductPagePartsTabs } from "./productPagePartsTabs";
import { ProductComments } from "./productComments";
import { Column } from "@/ui/layouts/column";

export function ProductPageParts({ product }: { product: Product }) {
  return (
    <Column className="gap-16px">
      <ProductPagePartsTabs />
      <TechnicalDetailsTable product={product} />
      <SimilarProducts productId={product.productId} />
      <ProductComments />
    </Column>
  );
}
