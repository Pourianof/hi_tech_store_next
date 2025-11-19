import { Wrapper } from "@/app/_shared/wrapper";
import { captalize } from "@/lib/helpers/stringHelpers";
import Icon from "@/ui/icons/icon";
import Link from "next/link";
import { auth } from "../../../../auth";
import { CartPreview } from "./_components/cartPreview";
import { CheckoutSectionHeader } from "./_components/checkoutSectionHeader";
import { ShippinhMethodInput } from "./_components/shippingMethodInput";
import { ShippingRadioButtonList } from "./_components/shippingRadioButton";
import { protectRoute } from "@/lib/helpers/protectRoute";

export default async function CheckoutPage() {
  await protectRoute({ callbackRoute: "/order/checkout" });
  const session = await auth();

  const { user } = session!;
  return (
    <div>
      <Wrapper>
        <div>
          <CheckoutSectionHeader text="User" />
          <div className="flex items-center bg-gray-neutral-f9 p-3 rounded-xl  justify-between">
            <input
              className="text-gray-neutral-50"
              readOnly
              disabled
              value={`${captalize(user.name)} ${user.lastName}`}
            />
            <button className="cursor-pointer">
              <Icon name="edit" className="text-2xl" />
            </button>
          </div>
        </div>
        <ShippinhMethodInput />
        <div>
          <CheckoutSectionHeader text="Shipping method" />
          <ShippingRadioButtonList />
        </div>
        <Link
          className="text-primary-blue-09 ps-2"
          href={{ pathname: "/order/cart" }}
        >
          Return to Cart
        </Link>

        <CartPreview />
      </Wrapper>
    </div>
  );
}
