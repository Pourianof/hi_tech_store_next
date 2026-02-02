import { getSingleProduct } from "@/api/productApi";
import { ProductMediaSlider } from "./_components/productMediaSlider";
import { ProductOverview } from "./_components/productOverview";
import { ProductProvider } from "./_contexts/productContext";
import { ProductPageParts } from "./_components/productPageParts";
import { PaymentBox } from "./_components/paymentBox";
import { VariationProvider } from "./_contexts/variationContext";

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
        <div className="flex items-start">
          <ProductProvider product={product}>
            <div className="w-1/3">
              <ProductMediaSlider />
            </div>
          </ProductProvider>
          <div className="grow">
            <ProductOverview product={product} />
          </div>
          <ProductProvider product={product}>
            <PaymentBox />
          </ProductProvider>
        </div>
        <ProductPageParts product={product} />
      </div>
    </VariationProvider>
  );
}
