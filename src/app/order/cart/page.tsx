import Link from "next/link";
import { CartDetails } from "../_components/cartDetail";
import { CartList } from "./_components/cartList";
import { FilledButton } from "@/ui/form/AppButtons";
import { Column } from "@/ui/layouts/column";

export default function DefaultCartPage() {
  return (
    <Column className="desktop:flex-row items-start gap-10 desktop:gap-20 relative">
      <CartList />
      <CartDetails
        title="Payment details"
        button={
          <Link href={{ pathname: "/order/checkout" }}>
            <FilledButton>Procced to checkout</FilledButton>
          </Link>
        }
      />
    </Column>
  );
}
