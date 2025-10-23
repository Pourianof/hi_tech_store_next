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

const PAYMENT_CHANNEL = "payment-channel";
export function PaymentBox() {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        md:w-1/2 md:static
        shadow-light space-y-2 md:bg-white bg-gray-neutral-f6 z-10
        p-5
        md:rounded-xl rounded-t-xl
        "
    >
      <ChannelProvider channelIdentifier={PAYMENT_CHANNEL}>
        <MainPayment />
        <PaymentOptionsBox />
      </ChannelProvider>
    </div>
  );
}

function MainPayment() {
  const channel = useConsumable(PAYMENT_CHANNEL);
  const [showMode, setShowMode] = useState(false);
  // const displayMode = "display" in props && props.display !== false;

  useEffect(() => {
    const sub = channel.consume({
      onData(data) {
        console.log(data);
        setShowMode((data as { display: boolean }).display);
      },
    });

    return () => sub.cancel();
  }, [channel]);

  return (
    <div>
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
      <div
        className={`md:translate-0 md:static rounded-none transition-transform fixed left-0 right-0 bottom-0 z-20 md:bg-transparent md:p-0 p-8 bg-gray-neutral-f6 ${
          showMode ? "translate-y-0 rounded-t-2xl" : "translate-y-full"
        }`}
      >
        <PaymentPrice />
        <div className="flex flex-col">
          <RadioButton name="payment" label="Pay now" />
          <RadioButton
            name="payment"
            label={
              <div className="flex flex-col">
                <span>Buy in installments</span>
                <span className="text-sm">choose your installments period</span>
              </div>
            }
          />

          <div className="flex justify-evenly cursor-default">
            {[3, 6, 12, 18].map((index) => {
              return (
                <span
                  key={index}
                  className="flex text-center flex-col border p-1 text-gray-neutral-9e border-gray-neutral-9e rounded"
                >
                  <span>{index}</span>
                  <span>Months</span>
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex md:flex-col gap-4 items-stretch ">
          <Button
            variant="outlined"
            className="grow py-2"
            sx={{
              textTransform: "none",
              paddingY: "0.7rem",
            }}
          >
            Add to cart
          </Button>
          <Button
            variant="contained"
            className="grow"
            sx={{
              textTransform: "none",
              backgroundColor: "var(--color-primary-blue-0c)",
              paddingY: "0.7rem",
            }}
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
}

function PaymentPrice({ mode = "row" }: { mode?: "row" | "col" }) {
  const product = useProduct();
  product.discount = 12;
  const hasDiscount = !!product.discount;
  const paymenyPrice =
    product.price - (product.price * (product.discount ?? 0)) / 100;

  const formattedPaymentPrice = paymenyPrice.toFixed(2);
  const formmatedMainPrice = product.price.toFixed(2);

  return (
    <div
      className={`flex justify-between items-center md:flex-row ${
        mode == "col" ? "flex-col-reverse" : ""
      }`}
    >
      <div className="flex flex-col">
        <span className="font-semibold text-2xl">
          $ {formattedPaymentPrice}
        </span>
        {hasDiscount && (
          <span className="text-sm hidden md:visible text-gray-neutral-71">
            last price ${formmatedMainPrice}
          </span>
        )}
      </div>
      {hasDiscount && (
        <div className="font-semibold text-orange-600 text-xl">
          <span className="text-sm me-2 text-gray-neutral-71 line-through">
            $ {formmatedMainPrice}
          </span>
          <Icon className="text-2xl" name="discount" />
          <span>-{product.discount}%</span>
        </div>
      )}
    </div>
  );
}

function PaymentOptionsBox() {
  const sink = useSink(PAYMENT_CHANNEL);
  return (
    <div className="flex md:hidden gap-4 [&>*]:grow [&>*]:text-center">
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
