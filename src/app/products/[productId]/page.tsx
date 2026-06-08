import { getSingleProduct } from "@/api/productApi";
import { Product } from "@/core/models/product";
import { RowOnDesktopColumnOnMobile } from "@/ui/layouts/rownOnDesktopColumnOnMobile";
import { PaymentBox } from "./_components/paymentBox";
import { ProductMediaFixedList } from "./_components/productMediaFixedList";
import { ProductOverview } from "./_components/productOverview";
import { ProductPageParts } from "./_components/productPageParts";
import { ProductProvider } from "./_contexts/productContext";
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
        <ProductProvider product={product as Product}>
          <RowOnDesktopColumnOnMobile className="items-start gap-12px desktop:gap-24px">
            <div className="desktop:w-[40%]">
              <ProductMediaFixedList />
            </div>
            <div className="grow">
              <ProductOverview />
            </div>
            <PaymentBox />
          </RowOnDesktopColumnOnMobile>
          <ProductPageParts product={product as Product} />
        </ProductProvider>
      </div>
    </VariationProvider>
  );
}
