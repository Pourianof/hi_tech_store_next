import { ReactNode } from "react";
import { PaymentStagesPath } from "./_components/paymentStagesPath";
import { Wrapper } from "../_shared/wrapper";

export default async function OrderPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Wrapper>
      <PaymentStagesPath />
      {children}
    </Wrapper>
  );
}
