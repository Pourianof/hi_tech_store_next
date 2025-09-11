"use client";

import Image from "next/image";
import { Product } from "../../core/models/product";
import { CustomImage } from "./customImage";
import { Slider } from "./slider";
import Icon from "./icon";

const ON_SALE_PRODUCTS: Product[] = [
  {
    id: 0,
    title: "Logitech G502 Gaming Mouse",
    price: 19,
    discount: 50,
    img: "/images/on_sale/mouse.png",
    score: 0,
  },

  {
    id: 1,
    title:
      "NPET K10 Wired Gaming Keyboard, LED Backlit, Spill-Resistant Design",
    price: 19,
    discount: 50,
    img: "/images/on_sale/keyboard.png",
    score: 0,
  },
  {
    id: 2,
    title: "Apple Watch Series 7 (GPS, 41MM)",
    price: 19,
    discount: 50,
    img: "/images/on_sale/smart_watch1.png",
    score: 0,
  },
  {
    id: 3,
    title: "Apple 2022 MacBook Air M2 Chip (8GB RAM, 256GB SSD)",
    price: 19,
    discount: 50,
    img: "/images/on_sale/laptop.png",
    score: 0,
  },
  {
    id: 4,
    title: "samsung Titan smart watch",
    price: 19,
    discount: 50,
    img: "/images/on_sale/smart_watch2.png",
    score: 0,
  },
];

export function OnSaleProductList() {
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
        <Slider.SliderContainer className="gap-5 items-stretch last:me-5">
          {ON_SALE_PRODUCTS.map((prod) => (
            <Slider.SliderItem
              key={prod.id}
              className="shrink-0 basis-[30%] max-w-[200px]"
            >
              <ProductItem product={prod} />
            </Slider.SliderItem>
          ))}
        </Slider.SliderContainer>
        <div className="flex text-blue-50 text-2xl hover:*:cursor-pointer justify-end mr-2">
          <Slider.SliderBackwardButton>
            <Icon>l</Icon>
          </Slider.SliderBackwardButton>
          <Slider.SliderForwardButton>
            <Icon>r</Icon>
          </Slider.SliderForwardButton>
        </div>
      </Slider>
    </div>
  );
}

function ProductItem({ product }: { product: Product }) {
  const acualPrice = (product.discount / 100) * product.price;
  return (
    <div className="w-full relative bg-white h-full p-2 rounded-md flex flex-col gap-y-2 aspect-[0.78]">
      <span className="absolute left-0 text-xs bg-orange-200 text-orange-500 z-10 rounded-r-lg px-1 py-0.5">{`-${product.discount}%`}</span>
      <CustomImage aspectRatio={1.15} src={product.img} alt={product.title} />
      <h3 className="text-sm line-clamp-2">{product.title}</h3>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 line-through text-xs">{`$${product.price.toFixed(
          2
        )}`}</span>
        <span className="text-sm">{`$${acualPrice.toFixed(2)}`}</span>
      </div>
    </div>
  );
}
