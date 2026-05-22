import { getSingleProduct } from "@/api/productApi";
import { ProductMediaFixedList } from "./_components/productMediaFixedList";
import { ProductOverview } from "./_components/productOverview";
import { ProductProvider } from "./_contexts/productContext";
import { ProductPageParts } from "./_components/productPageParts";
import { PaymentBox } from "./_components/paymentBox";
import { VariationProvider } from "./_contexts/variationContext";
import { Row } from "@/ui/layouts/row";
import { Product } from "@/core/models/product";

export default async function ProductItemPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const productResult = await getSingleProduct(
    parseInt((await params).productId),
  );

  if (productResult.status == "failed") {
    return <span>fail to fetch product item</span>;
  }

  const product = productResult.data;

  const prodVariation = product.variations.at(0)!;

  return (
    <VariationProvider variation={prodVariation}>
      <div>
        <ProductProvider product={product as Product}>
          <Row className="items-start gap-24px">
            <div className="w-[40%]">
              <ProductMediaFixedList />
            </div>
            <div className="grow">
              <ProductOverview />
            </div>
            <PaymentBox />
          </Row>
          <ProductPageParts product={product as Product} />
        </ProductProvider>
      </div>
    </VariationProvider>
  );
}
