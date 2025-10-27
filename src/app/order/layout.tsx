import { ReactNode } from "react";
import { PaymentStagesPath } from "./_components/paymentStagesPath";

export default async function OrderPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <PaymentStagesPath />
      {children}
    </div>
  );
}
