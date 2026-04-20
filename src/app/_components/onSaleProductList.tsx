import Image from "next/image";
import {
  Slider,
  SliderBackwardButton,
  SliderContainer,
  SliderForwardButton,
  SliderItem,
} from "../../ui/slider";
import Icon from "../../ui/icons/icon";
import { DiscountLabel } from "./discountLabel";
import { productActions } from "@/ui/server_actions_wrapper/productActions";
import { FailedBox } from "./failedBox";
import { ProductModel } from "@/core/models/productModel";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";

export async function OnSaleProductList() {
  const result = await productActions.getOnSaleProducts();

  if (result.status == "failed") {
    return (
      <FailedBox
        title="Fail to load"
        message="Could not load on-sales products"
      />
    );
  }

  const products = result.data;

  if (!products.length) {
    return null;
  }

  return (
    <div className="p-2 pt-8 pr-0 flex touch-pan-y touch-pinch-zoom relative rounded-lg bg-blue-800 min-h-[200px] items-stretch gap-x-4">
      <Image
        src="/sketches/curvy.svg"
        className="top-0 left-0 absolute"
        width={200}
        height={200}
        alt="Curvy sketch"
      />
      <div className="px-2 pt-4 pb-20 flex flex-col items-center text-slate-100">
        <span className="text-xl font-semibold">Products On Sale</span>
        <span>Shop Now!</span>

        <span className="mt-auto">View all {">"}</span>
      </div>
      <Slider>
        <SliderContainer className="gap-5 items-stretch last:me-5">
          {products.map((prod) => (
            <SliderItem
              key={prod.productId}
              className="shrink-0 basis-[30%] max-w-[200px]"
            >
              <ProductItem product={prod} />
            </SliderItem>
          ))}
        </SliderContainer>
        <div className="flex text-blue-50 text-2xl hover:*:cursor-pointer justify-end mr-2">
          <SliderBackwardButton>
            <Icon name="left_arrow" />
          </SliderBackwardButton>
          <SliderForwardButton>
            <Icon name="left_arrow" className="rotate-180" />
          </SliderForwardButton>
        </div>
      </Slider>
    </div>
  );
}

function ProductItem({ product }: { product: ProductModel }) {
  const mainVariation = product.mainVariation;
  const acualPrice = mainVariation?.price;
  const coverImage = mainVariation?.getCandidateImageMedia()?.url;
  return (
    <Column className="w-full relative bg-white h-full p-2 rounded-md gap-y-2 aspect-[0.78]">
      <DiscountLabel discount={mainVariation?.discountPercentage ?? 0} />
      <div className="w-ful">
        <ApiImage aspectRatio={1.15} src={coverImage} alt={product.title} />
      </div>
      <h3 className="text-sm line-clamp-2">{product.title}</h3>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 line-through text-xs">{`$${acualPrice?.toFixed(2)}`}</span>
        <span className="text-sm">{`$${mainVariation?.finalPrice.toFixed(
          2,
        )}`}</span>
      </div>
    </Column>
  );
}
