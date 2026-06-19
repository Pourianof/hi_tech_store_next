"use client";

import { SHIPPING_METHOD_FIELD_NAME } from "@/lib/helpers/consts";
import { ErrorMessageLabel } from "@/ui/form/errorMessageLabel";
import {
  ControlledRadioButton,
  ControlledRadioButtonGroup,
} from "@/ui/form/radioButton";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useWatch } from "react-hook-form";

export function ShippingRadioButtonList() {
  const searchParams = useSearchParams();
  const errs = searchParams.get("error")?.split(",");
  const [noShippingSelectionError] = useState(
    errs?.includes(SHIPPING_METHOD_FIELD_NAME) ?? false,
  );

  return (
    <ControlledRadioButtonGroup
      required="You must select the shipping method"
      fieldName={SHIPPING_METHOD_FIELD_NAME}
    >
      <div className="space-y-4 ">
        <ShippingRadioButton
          title={"Free Shipping"}
          deliveryRange={[7, 30]}
          price={0}
          value="free"
        />
        <ShippingRadioButton
          title={"Regular Shipping"}
          deliveryRange={[3, 14]}
          price={7.5}
          value="regular"
        />
        <ShippingRadioButton
          title={"Express Shipping"}
          deliveryRange={[1, 3]}
          price={22.5}
          value="express"
        />
        {noShippingSelectionError ? (
          <div className="text-error border border-error text-sm bg-error-light p-2 rounded">
            You must select a shipping method
          </div>
        ) : null}
        <ErrorMessageLabel fieldName={SHIPPING_METHOD_FIELD_NAME} />
      </div>
    </ControlledRadioButtonGroup>
  );
}

export function ShippingRadioButton({
  title,
  price,
  deliveryRange,
  value,
}: {
  title: string;
  deliveryRange: [number, number];
  price: number;
  value: string;
}) {
  const shipping = useWatch({ name: SHIPPING_METHOD_FIELD_NAME });

  const hasSelected = shipping == value;

  return (
    <ControlledRadioButton
      size="big"
      containerClassName={
        "cursor-pointer border border-gray-neutral-f6 p-8px rounded-lg bg-gray-neutral-f9 border border-gray-neutral-f6 " +
        (hasSelected ? "bg-primary-blue-e4 border border-primary-blue-78" : "")
      }
      label={
        <Column className="grow items-stretch">
          <Body size="md">{title}</Body>
          <Row className="text-gray-neutral-50">
            <Body size="sm">
              {deliveryRange.at(0)}-{deliveryRange.at(1)} Business days
            </Body>
            <Body size="sm" className="ms-auto">
              ${price.toFixed(2)}
            </Body>
          </Row>
        </Column>
      }
      value={value}
    />
  );
}
