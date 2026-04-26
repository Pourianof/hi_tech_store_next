import { CartPaymentDetails } from "./cartPaymentDetails";
import Link from "next/link";
import { FilledButton } from "@/ui/form/AppButtons";
import { Card } from "@/ui/theme/card";
import { Column } from "@/ui/layouts/column";
import { H4 } from "@/ui/theme/text/headers";

export function CartDetails() {
  return (
    <Card
      className="border border-gray-neutral-ed desktop:min-w-1/3 desktop:sticky desktop:top-20"
      noShadow
      noHoverReaction
    >
      <Column className="gap-16px">
        <H4>Payment details</H4>
        <CartPaymentDetails />
        <Link href={{ pathname: "/order/checkout" }}>
          <FilledButton>Procced to checkout</FilledButton>
        </Link>
      </Column>
    </Card>
  );
}
