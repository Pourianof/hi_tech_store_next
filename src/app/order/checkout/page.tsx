import { protectRoute } from "@/lib/helpers/protectRoute";
import { captalize } from "@/lib/utils/stringHelpers";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { H5 } from "@/ui/theme/text/headers";
import Link from "next/link";
import { auth } from "../../../../auth";
import { CartPreview } from "./_components/cartPreview";
import { CheckoutForm } from "./_components/checkoutSubmitForm";
import { ShippinhMethodInput } from "./_components/shippingMethodInput";
import { ShippingRadioButtonList } from "./_components/shippingRadioButton";
import { RowOnDesktopColumnOnMobile } from "@/ui/layouts/rownOnDesktopColumnOnMobile";
import { Card } from "@/ui/theme/card";

export default async function CheckoutPage() {
  await protectRoute({ callbackRoute: "/order/checkout" });

  return (
    <CheckoutForm>
      <RowOnDesktopColumnOnMobile className="gap-24px">
        <CheckoutConfirmation />
        <CartPreview />
      </RowOnDesktopColumnOnMobile>
    </CheckoutForm>
  );
}

async function CheckoutConfirmation() {
  const session = await auth();

  const { user } = session!;
  return (
    <Column className="grow">
      <Card
        noShadow
        noHoverReaction
        className=" desktop:border desktop:border-gray-neutral-ed"
      >
        <div>
          <H5>User</H5>
          <div className="flex items-center bg-gray-neutral-f9 p-3 rounded-xl  justify-between">
            <input
              className="text-gray-neutral-50"
              readOnly
              disabled
              value={`${captalize(user.firstName)} ${user.lastName}`}
            />
            <button className="cursor-pointer">
              <Icon name="edit" className="text-2xl" />
            </button>
          </div>
        </div>
        <H5>Ship to</H5>
        <ShippinhMethodInput />
        <Column>
          <H5>Shipping method</H5>
          <ShippingRadioButtonList />
        </Column>
      </Card>
      <Link
        className="text-primary-blue-09 ps-2"
        href={{ pathname: "/order/cart" }}
      >
        Return to Cart
      </Link>
    </Column>
  );
}
