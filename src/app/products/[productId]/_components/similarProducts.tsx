import { ProductItem } from "@/app/_components/productItem";
import { productActions } from "@/ui/server_actions_wrapper/productActions";
import { Slider, SliderContainer, SliderItem } from "@/ui/slider";
import { H5 } from "@/ui/theme/text/headers";

export async function SimilarProducts({ productId }: { productId: number }) {
  const productsResult = await productActions.getSimilarProductsOf(productId);

  if (productsResult.status == "failed") {
    return <div>Something went wrong</div>;
  }

  const products = productsResult.data;

  if (!products.length) {
    return <div>No product exist</div>;
  }

  return (
    <div id="similar-products">
      <H5>Similar Products</H5>
      <Slider>
        <SliderContainer className="gap-2 items-stretch last:me-5">
          {products.map((product) => (
            <SliderItem className="shrink-0 w-1/4" key={product.productId}>
              <ProductItem product={product} />
            </SliderItem>
          ))}
        </SliderContainer>
      </Slider>
    </div>
  );
}
