"use client";

import { useCart } from "@/ui/contexts/cart/cartContext";
import { FillerBox } from "@/ui/fillerBox";
import { priceFormatter } from "@/ui/helpers/priceFormatter";
import { CustomImage } from "@/ui/image/customImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Slider } from "@/ui/slider";
import { useIsDesktopScreen } from "@/ui/theme/helpers/isDesktopMode";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";

export function ResponsiveCartView() {
  const isDesktopScreen = useIsDesktopScreen();

  return isDesktopScreen ? <DesktopCartPreview /> : <MobileCartPreview />;
}

export function DesktopCartPreview() {
  const {
    cart: { items },
  } = useCart();

  return (
    <Column className="gap-16px">
      {items.map((item) => (
        <Row
          key={item.productVariationModel.productVariationId}
          className="pb-2 gap-8px border-b border-b-gray-neutral-cb"
        >
          <CustomImage
            src={item.productVariationModel.getCandidateImageMedia()?.url}
            alt={item.product.title}
            square={true}
            className="w-80px"
          />
          <Column className="gap-8px grow">
            <Body size="xs" className="text-gray-neutral-2d">
              {item.product.title}
            </Body>
            <div>
              <Caption size="sm" className="text-gray-neutral-71">
                {item.productVariationModel.color.name}
              </Caption>
              <Caption size="sm" className="text-gray-neutral-71">
                ×{item.amount}
              </Caption>
            </div>
            <Row className="justify-end">
              <Body size="xs" className="text-gray-neutral-2d">
                ${priceFormatter(item.finalPrice)}
              </Body>
              {!!item.totalDiscount && (
                <Body size="xs" className="text-gray-neutral-71">
                  from ${priceFormatter(item.actualPrice)}
                </Body>
              )}
            </Row>
          </Column>
        </Row>
      ))}
    </Column>
  );
}

export function MobileCartPreview() {
  const {
    cart: { items },
  } = useCart();

  return (
    <FillerBox>
      <Slider>
        <Slider.SliderContainer>
          {items.map(
            ({ product, amount, productVariationModel: variationModel }) => (
              <Slider.SliderItem
                className="min-w-1/4 max-w-1/4 rounded flex flex-col p-1 bg-white"
                key={product.productId}
              >
                {
                  <CustomImage
                    square={true}
                    alt={product.title}
                    src={variationModel.getCandidateImageMedia()?.url}
                  />
                }
                <span>×{amount}</span>
                <span className="space-x-2">
                  <span className="w-4 aspect-square inline-block bg-black rounded-full align-middle"></span>
                  <span>Black</span>
                </span>
              </Slider.SliderItem>
            ),
          )}
        </Slider.SliderContainer>
      </Slider>
    </FillerBox>
  );
}
