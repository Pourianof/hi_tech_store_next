"use client";
import { Column } from "@/ui/layouts/column";
import { CartDetails } from "../../_components/cartDetail";
import { PaymentLink } from "./paymentLink";
import { ResponsiveCartView } from "../../_components/cartPreview";
import { DiscountField } from "./discountField";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import {
  SHIPMENT_PRICE_DATA,
  ShipmentData,
} from "../../_components/shipmentDataInjector";
import { isTwoStringEqual } from "@/lib/utils/stringHelpers";

export function CartPreviewWithShipment({ shipment }: { shipment: string }) {
  const shipmentData = useStaticData(SHIPMENT_PRICE_DATA) as ShipmentData[];

  const shipmentPrice = shipmentData.find((s) =>
    isTwoStringEqual(s.name, shipment),
  )?.price;

  return (
    <CartDetails
      title="Your Order"
      button={<PaymentLink />}
      main={
        <Column>
          <ResponsiveCartView />
          <DiscountField />
        </Column>
      }
      shipmentCost={shipmentPrice}
    />
  );
}
