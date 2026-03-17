import { Wrapper } from "@/app/_shared/wrapper";
import { routes } from "@/app/routes";
import { SHIPPING_METHOD_FIELD_NAME } from "@/lib/helpers/consts";
import { protectRoute } from "@/lib/helpers/protectRoute";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CartPaymentDetails } from "../cart/_components/cartPaymentDetails";
import { CheckoutSectionHeader } from "../checkout/_components/checkoutSectionHeader";
import { ShippinhMethodInput } from "../checkout/_components/shippingMethodInput";
import { DiscountField } from "./_components/discountField";
import { PaymentLink } from "./_components/paymentLink";
import { DiscountCodeContextProvider } from "./_contexts/discountCodeContext";

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
    <Wrapper>
      <DiscountCodeContextProvider>
        <div>
          <div>
            <CheckoutSectionHeader text="Shipping address" />
            <ShippinhMethodInput />
            <Link
              href={{ pathname: routes.order.checkout }}
              className="text-primary-blue-0c text-sm"
            >
              Return to Checkout
            </Link>
          </div>
          <div>
            <CheckoutSectionHeader text="Your Order" />
            <DiscountField />
            <CartPaymentDetails />
          </div>
          <PaymentLink />
        </div>
      </DiscountCodeContextProvider>
    </Wrapper>
  );
}
