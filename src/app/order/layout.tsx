import { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";
import { PaymentStagesPath } from "./_components/paymentStagesPath";
import { ShipmentDataInjector } from "./_components/shipmentDataInjector";

export default async function OrderPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Wrapper>
      <PaymentStagesPath />
      <ShipmentDataInjector>{children}</ShipmentDataInjector>
    </Wrapper>
  );
}
