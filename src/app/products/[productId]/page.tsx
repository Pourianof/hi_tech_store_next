import { getSingleProduct } from "@/api/productApi";
import { ProductMediaSlider } from "./_components/productMediaSlider";
import { ProductOverview } from "./_components/productOverview";
import { ProductProvider } from "./_contexts/productContext";
import { ProductPageParts } from "./_components/productPageParts";

export default async function ProductItemPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const productResult = await getSingleProduct(
    parseInt((await params).productId)
  );

  if (productResult.status == "failed") {
    return <span>fail to fetch product item</span>;
  }

  const product = productResult.data;

  return (
    <div>
      <div className="flex">
        <ProductProvider product={product}>
          <div className="max-w-1/2">
            <ProductMediaSlider />
          </div>
        </ProductProvider>
        <ProductOverview product={product} />
      </div>
      <ProductPageParts product={product} />
    </div>
  );
}
