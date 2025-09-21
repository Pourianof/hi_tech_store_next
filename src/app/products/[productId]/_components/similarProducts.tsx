import { getProducts } from "@/api/productApi";
import { ProductItem } from "@/app/_components/productItem";
import { Slider, SliderContainer, SliderItem } from "@/app/_components/slider";

export async function SimilarProducts() {
  const productsResult = await getProducts();
  if (productsResult.status == "failed") {
    return <div>Something went wrong</div>;
  }

  const products = productsResult.data;
  if (!products.length) {
    return <div>No product exist</div>;
  }

  return (
    <div id="similar-products">
      <h3 className="my-2 font-semibold text-xl">Similar Products</h3>
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
