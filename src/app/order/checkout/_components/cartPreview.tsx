"use client";

import { getMainMedia } from "@/core/models/helpers/productHelpers";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { FilledButton } from "@/ui/form/AppButtons";
import { ApiImage } from "@/ui/image/ApiImage";
import { Button } from "@mui/material";
import Link from "next/link";
import { CartPaymentDetails } from "../../cart/_components/cartPaymentDetails";
import { FillerBox } from "@/ui/fillerBox";
import { Slider } from "@/ui/slider";

export function CartPreview() {
  const { items } = useCart();
  return (
    <div>
      <FillerBox>
        {/* <div className="flex overflow-auto bg-gray-neutral-f9 w-full rounded-lg p-2 gap-4 text-gray-neutral-71"> */}
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
        {/* </div> */}
      </FillerBox>

      <CartPaymentDetails />
      <DiscountField />
      <Link href={{ pathname: "/order/payment" }}>
        <FilledButton>Continue to pay</FilledButton>
      </Link>
    </div>
  );
}

function DiscountField() {
  return (
    <div className="flex items-stretch gap-2 my-8">
      <input
        className="p-2 border grow border-gray-neutral-b4 rounded-lg"
        placeholder="Discount code"
      />
      <Button variant="outlined">Apply</Button>
    </div>
  );
}
