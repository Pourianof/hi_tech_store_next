"use client";

import { RadioButton } from "@/ui/form/radioButton";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

enum ShippingMode {
  FREE,
  REGULAR,
  EXPRESS,
}

export function ShippingRadioButtonList() {
  const searchParams = useSearchParams();
  const errs = searchParams.get("error")?.split(",");
  const [noShippingSelectionError] = useState(
    errs?.includes("shipping-method") ?? false
  );

  const [selected, setSelected] = useState<ShippingMode>();
  return (
    <div className="space-y-4 ">
      <ShippingRadioButton
        onSelect={() => setSelected(ShippingMode.FREE)}
        isSelected={selected == ShippingMode.FREE}
        title={"Free Shipping"}
        deliveryRange={[7, 30]}
        price={0}
      />
      <ShippingRadioButton
        onSelect={() => setSelected(ShippingMode.REGULAR)}
        isSelected={selected == ShippingMode.REGULAR}
        title={"Regular Shipping"}
        deliveryRange={[3, 14]}
        price={7.5}
      />
      <ShippingRadioButton
        onSelect={() => setSelected(ShippingMode.EXPRESS)}
        isSelected={selected == ShippingMode.EXPRESS}
        title={"Express Shipping"}
        deliveryRange={[1, 3]}
        price={22.5}
      />
      {noShippingSelectionError ? (
        <div className="text-white text-sm bg-red-500 p-2 rounded">
          You must select a shipping method
        </div>
      ) : null}
    </div>
  );
}

export function ShippingRadioButton({
  title,
  price,
  deliveryRange,
  isSelected,
  onSelect,
}: {
  title: string;
  deliveryRange: [number, number];
  price: number;
  isSelected?: boolean;
  onSelect: VoidFunction;
}) {
  return (
    <RadioButton
      onSelect={onSelect}
      size="big"
      containerClassName={
        "cursor-pointer border border-gray-neutral-f6 p-2 rounded-lg bg-gray-neutral-f9 border border-gray-neutral-f6 " +
        (isSelected ? "bg-primary-blue-e4 border border-primary-blue-78" : "")
      }
      label={
        <div className="flex flex-col grow items-stretch text">
          <span className="text-gray-neutral-2d">{title}</span>
          <div className="flex justify-between text-gray-neutral-50 text-sm">
            <span>
              {deliveryRange.at(0)}-{deliveryRange.at(1)} Business days
            </span>
            <span>${price.toFixed(2)}</span>
          </div>
        </div>
      }
      name="shipping-mode"
    />
  );
}
