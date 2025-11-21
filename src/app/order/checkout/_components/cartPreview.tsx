"use client";

import { getMainMedia } from "@/core/models/helpers/productHelpers";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { FillerBox } from "@/ui/fillerBox";
import { ApiImage } from "@/ui/image/ApiImage";
import { Slider } from "@/ui/slider";
import { CartPaymentDetails } from "../../cart/_components/cartPaymentDetails";

export function CartPreview() {
  const { items } = useCart();
  return (
    <div>
      <FillerBox>
        <Slider>
          <Slider.SliderContainer>
            {items.map(({ product, amount }) => (
              <Slider.SliderItem
                className="min-w-1/4 max-w-1/4 rounded flex flex-col p-1 bg-white"
                key={product.productId}
              >
                {
                  <ApiImage
                    square={true}
                    alt={product.title}
                    src={getMainMedia(product)?.url}
                  />
                }
                <span>×{amount}</span>
                <span className="space-x-2">
                  <span className="w-4 aspect-square inline-block bg-black rounded-full align-middle"></span>
                  <span>Black</span>
                </span>
              </Slider.SliderItem>
            ))}
          </Slider.SliderContainer>
        </Slider>
      </FillerBox>

      <CartPaymentDetails />
    </div>
  );
}
