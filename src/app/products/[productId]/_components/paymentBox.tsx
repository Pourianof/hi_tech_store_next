"use client";
import {
  ChannelProvider,
  useConsumable,
  useSink,
} from "@/ui/contexts/channelContext";
import { RadioButton } from "@/ui/form/radioButton";
import Icon from "@/ui/icons/icon";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useProduct } from "../_contexts/productContext";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { useActiveVariation } from "../_contexts/variationContext";
import { Card } from "@/ui/theme/card";
import { H5, H6 } from "@/ui/theme/text/headers";
import { ProductVariationModel } from "@/core/models/productModel";
import { priceFormatter } from "@/ui/helpers/priceFormatter";
import { Body } from "@/ui/theme/text/body";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { OutlinedButton } from "@/ui/form/AppButtons";
import { Overline } from "@/ui/theme/text/overline";

const PAYMENT_CHANNEL = "payment-channel";
export function PaymentBox() {
  return (
    <Card
      noHoverReaction
      className="
        fixed bottom-0 left-0 right-0
        desktop:w-[25%]
        shadow-light space-y-2 desktop:bg-white bg-gray-neutral-f6 z-10
        p-5
        md:rounded-xl rounded-t-xl
        desktop:sticky desktop:top-20
        "
    >
      <ChannelProvider channelIdentifier={PAYMENT_CHANNEL}>
        <MainPayment />
        <PaymentOptionsBox />
      </ChannelProvider>
    </Card>
  );
}

function MainPayment() {
  const channel = useConsumable(PAYMENT_CHANNEL);
  const [showMode, setShowMode] = useState(false);
  const {
    actions: { addProductToCart },
  } = useCart();
  const product = useProduct();
  const { activeVariation } = useActiveVariation();
  // const displayMode = "display" in props && props.display !== false;

  useEffect(() => {
    const sub = channel.consume({
      onData(data) {
        setShowMode((data as { display: boolean }).display);
      },
    });

    return () => sub.cancel();
  }, [channel]);

  return (
    <Column>
      <div
        className={
          "fixed w-full h-full left-0 top-0 md:hidden bg-black/40 " +
          (showMode ? "visible" : "hidden")
        }
        onClick={(e) => {
          e.preventDefault();
          setShowMode(false);
        }}
      ></div>
      <Column
        className={`gap-16px md:translate-0 md:static rounded-none transition-transform fixed left-0 right-0 bottom-0 z-20 md:bg-transparent md:p-0 p-8 bg-gray-neutral-f6 ${
          showMode ? "translate-y-0 rounded-t-2xl" : "translate-y-full"
        }`}
      >
        <PaymentPrice />
        <Column className="gap-8px">
          <Column>
            <RadioButton
              disabled
              name="payment"
              label={<Body size="md">Buy in installments</Body>}
            />
            <RadioButton
              disabled
              name="payment"
              label={
                <Column>
                  <Body size="md">Buy in installments</Body>
                  <Body size="xs" className="text-gray-neutral-44">
                    choose your installments period
                  </Body>
                </Column>
              }
            />
          </Column>

          <Row className="justify-evenly cursor-default">
            {[3, 6, 12, 18].map((index) => {
              return (
                <Column
                  key={index}
                  className="text-center w-[60px] border p-1 border-gray-neutral-ed rounded"
                >
                  <Body size="lg" className="text-gray-neutral-44">
                    {index}
                  </Body>
                  <Overline size="sm" className="text-gray-neutral-71">
                    Months
                  </Overline>
                </Column>
              );
            })}
          </Row>
        </Column>
        <div className="flex md:flex-col gap-4 items-stretch ">
          <OutlinedButton
            onClick={() => {
              addProductToCart({
                amount: 1,
                product,
                variation: activeVariation,
              });
            }}
          >
            Add to cart
          </OutlinedButton>
        </div>
      </Column>
    </Column>
  );
}

function PaymentPrice({ mode = "row" }: { mode?: "row" | "col" }) {
  const { activeVariation } = useActiveVariation();
  const variation = activeVariation as ProductVariationModel;

  const hasDiscount = !!variation.hasDiscount;
  const paymenyPrice = variation.finalPrice;

  const formattedPaymentPrice = priceFormatter(paymenyPrice);
  const formmatedMainPrice = priceFormatter(variation.price);

  return (
    <div
      className={`flex justify-between items-center md:flex-row ${
        mode == "col" ? "flex-col-reverse" : ""
      }`}
    >
      <Column>
        <H5>$ {formattedPaymentPrice}</H5>
        {hasDiscount && (
          <Body size="sm" className="hidden md:visible text-gray-neutral-71">
            last price ${formmatedMainPrice}
          </Body>
        )}
      </Column>
      {hasDiscount && (
        <Column className="font-semibold text-xl">
          <Body size="xs" className="me-2 text-gray-neutral-71 line-through">
            $ {formmatedMainPrice}
          </Body>
          <Row>
            <Icon className="text-2xl text-orange-600" name="discount" />
            <H6 className="text-secondary-f4">
              -{priceFormatter(variation.discountPercentage ?? 0)}%
            </H6>
          </Row>
        </Column>
      )}
    </div>
  );
}

function PaymentOptionsBox() {
  const sink = useSink(PAYMENT_CHANNEL);
  return (
    <div className="flex md:hidden gap-4 *:grow *:text-center">
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          sink.add({ display: true });
        }}
      >
        View payment options
      </Button>
      <PaymentPrice mode="col" />
    </div>
  );
}
