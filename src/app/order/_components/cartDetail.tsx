import { Column } from "@/ui/layouts/column";
import { Card } from "@/ui/theme/card";
import { H4 } from "@/ui/theme/text/headers";
import { ReactNode } from "react";
import { CartPaymentDetails } from "../cart/_components/cartPaymentDetails";

export function CartDetails({
  main,
  button,
  title,
  shipmentCost,
}: {
  title: string;
  main?: ReactNode;
  button?: ReactNode;
  shipmentCost?: number;
}) {
  return (
    <Card
      className="desktop:border w-full border-gray-neutral-ed desktop:min-w-1/3 desktop:w-1/3 desktop:sticky desktop:top-20 self-start"
      noShadow
      noHoverReaction
    >
      <Column className="gap-16px">
        <H4>{title}</H4>
        {main}
        <CartPaymentDetails shipmentCost={shipmentCost} />
        {button}
      </Column>
    </Card>
  );
}
