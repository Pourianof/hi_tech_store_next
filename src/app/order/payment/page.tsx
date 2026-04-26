import { routes } from "@/app/routes";
import { SHIPPING_METHOD_FIELD_NAME } from "@/lib/helpers/consts";
import { protectRoute } from "@/lib/helpers/protectRoute";
import { RowOnDesktopColumnOnMobile } from "@/ui/layouts/rownOnDesktopColumnOnMobile";
import { H5 } from "@/ui/theme/text/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CartDetails } from "../_components/cartDetail";
import { ShippinhMethodInput } from "../checkout/_components/shippingMethodInput";
import { DiscountField } from "./_components/discountField";
import { PaymentLink } from "./_components/paymentLink";
import { DiscountCodeContextProvider } from "./_contexts/discountCodeContext";
import { Column } from "@/ui/layouts/column";
import { ResponsiveCartView } from "../_components/cartPreview";
import { Card } from "@/ui/theme/card";

export default async function PaymentDefaultPage({
  searchParams: sp,
}: {
  searchParams: Record<string, string>;
}) {
  await protectRoute({ callbackRoute: routes.order.cart });

  const searchParams = await sp;

  if (!searchParams[SHIPPING_METHOD_FIELD_NAME]) {
    redirect(`${routes.order.checkout}?error=${SHIPPING_METHOD_FIELD_NAME}`);
  }

  return (
    <DiscountCodeContextProvider>
      <RowOnDesktopColumnOnMobile className="gap-24px">
        <Column className="grow gap-2">
          <Card noShadow noHoverReaction border>
            <H5>Shipping address</H5>
            <ShippinhMethodInput />
          </Card>
          <Link
            href={{ pathname: routes.order.checkout }}
            className="text-primary-blue-0c text-sm"
          >
            Return to Checkout
          </Link>
        </Column>
        <CartDetails
          title="Your Order"
          button={<PaymentLink />}
          main={
            <Column>
              <ResponsiveCartView />
              <DiscountField />
            </Column>
          }
        />
      </RowOnDesktopColumnOnMobile>
    </DiscountCodeContextProvider>
  );
}
