import { captalize } from "@/lib/helpers/stringHelpers";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { ShippingRadioButtonList } from "./_components/shippingRadioButton";
import Link from "next/link";
import Icon from "@/ui/icons/icon";
import { CartPreview } from "./_components/cartPreview";
import { Wrapper } from "@/app/_shared/wrapper";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session) {
    const searchParams = new URLSearchParams();
    searchParams.append("redirect", `/order/checkout`);
    redirect(`/auth/login?${searchParams.toString()}`);
  }

  const { user } = session;
  return (
    <div>
      <Wrapper>
        <div>
          <SectionHeader text="User" />
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
        <div>
          <SectionHeader text="Ship to" />
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
        <div>
          <SectionHeader text="Shipping method" />
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

function SectionHeader({ text }: { text: string }) {
  return (
    <label className="text-gray-neutral-44 font-semibold text-lg">{text}</label>
  );
}
