"use client";

import { useCart } from "@/ui/contexts/cart/cartContext";
import { FillerBox } from "@/ui/fillerBox";
import { FilledButton } from "@/ui/form/AppButtons";
import { ApiImage } from "@/ui/image/ApiImage";
import { Slider } from "@/ui/slider";
import { useIsDesktopScreen } from "@/ui/theme/helpers/isDesktopMode";
import { CartDetails } from "../../_components/cartDetail";
import { Column } from "@/ui/layouts/column";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { Row } from "@/ui/layouts/row";
import { priceFormatter } from "@/ui/helpers/priceFormatter";

export function CartPreview() {
  const isDesktopScreen = useIsDesktopScreen();

  return (
    <CartDetails
      title="Your Order"
      main={isDesktopScreen ? <DesktopCartPreview /> : <MobileCartPreview />}
      button={<FilledButton type="submit">Continue to pay</FilledButton>}
    />
  );
}

function DesktopCartPreview() {
  const {
    cart: { items },
  } = useCart();

  return (
    <Column className="gap-16px divide-y-[1px] divide-gray-neutral-cb">
      {items.map((item) => (
        <Row
          key={item.productVariationModel.productVariationId}
          className="pb-2 gap-8px"
        >
          <ApiImage
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

function MobileCartPreview() {
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
                  <ApiImage
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
