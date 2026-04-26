"use client";

import { FilledButton } from "@/ui/form/AppButtons";
import { CartDetails } from "../../_components/cartDetail";
import { ResponsiveCartView } from "../../_components/cartPreview";
import { useWatch } from "react-hook-form";
import { SHIPPING_METHOD_FIELD_NAME } from "@/lib/helpers/consts";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import {
  SHIPMENT_PRICE_DATA,
  ShipmentData,
} from "../../_components/shipmentDataInjector";

export function CartPreview() {
  const shipmentData = useStaticData(SHIPMENT_PRICE_DATA) as ShipmentData[];
  const shipment = useWatch({ name: SHIPPING_METHOD_FIELD_NAME });

  return (
    <CartDetails
      shipmentCost={
        !!shipment
          ? shipmentData.find((s) => s.name == shipment)?.price
          : undefined
      }
      title="Your Order"
      main={<ResponsiveCartView />}
      button={<FilledButton type="submit">Continue to pay</FilledButton>}
    />
  );
}
