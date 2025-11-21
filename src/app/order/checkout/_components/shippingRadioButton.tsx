"use client";

import { SHIPPING_METHOD_FIELD_NAME } from "@/lib/helpers/consts";
import { ErrorMessageLabel } from "@/ui/form/errorMessageLabel";
import { ControlledRadioButton } from "@/ui/form/radioButton";
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
    errs?.includes(SHIPPING_METHOD_FIELD_NAME) ?? false
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
        value="free"
      />
      <ShippingRadioButton
        onSelect={() => setSelected(ShippingMode.REGULAR)}
        isSelected={selected == ShippingMode.REGULAR}
        title={"Regular Shipping"}
        deliveryRange={[3, 14]}
        price={7.5}
        value="regular"
      />
      <ShippingRadioButton
        onSelect={() => setSelected(ShippingMode.EXPRESS)}
        isSelected={selected == ShippingMode.EXPRESS}
        title={"Express Shipping"}
        deliveryRange={[1, 3]}
        price={22.5}
        value="express"
      />
      {noShippingSelectionError ? (
        <div className="text-white text-sm bg-red-500 p-2 rounded">
          You must select a shipping method
        </div>
      ) : null}
      <ErrorMessageLabel fieldName={SHIPPING_METHOD_FIELD_NAME} />
    </div>
  );
}

export function ShippingRadioButton({
  title,
  price,
  deliveryRange,
  isSelected,
  value,
}: {
  title: string;
  deliveryRange: [number, number];
  price: number;
  isSelected?: boolean;
  onSelect: VoidFunction;
  value: string;
}) {
  return (
    <ControlledRadioButton
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
      value={value}
      name={SHIPPING_METHOD_FIELD_NAME}
    />
  );
}
