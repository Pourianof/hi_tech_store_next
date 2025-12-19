import { redirect } from "next/navigation";
import { CartPaymentDetails } from "../cart/_components/cartPaymentDetails";
import { protectRoute } from "@/lib/helpers/protectRoute";
import { routes } from "@/app/routes";
import { SHIPPING_METHOD_FIELD_NAME } from "@/lib/helpers/consts";
import { Wrapper } from "@/app/_shared/wrapper";
import Link from "next/link";
import { DiscountField } from "./_components/discountField";
import { CheckoutSectionHeader } from "../checkout/_components/checkoutSectionHeader";
import { FilledButton } from "@/ui/form/AppButtons";
import { ShippinhMethodInput } from "../checkout/_components/shippingMethodInput";

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
        <a href={routes.order.payment}>
          <FilledButton>Place order</FilledButton>
        </a>
      </div>
    </Wrapper>
  );
}
