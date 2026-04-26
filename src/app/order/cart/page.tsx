import Link from "next/link";
import { CartDetails } from "../_components/cartDetail";
import { CartList } from "./_components/cartList";
import { FilledButton } from "@/ui/form/AppButtons";

export default function DefaultCartPage() {
  return (
    <div className="flex flex-col desktop:flex-row items-start desktop:gap-20 relative">
      <CartList />
      <CartDetails
        title="Payment details"
        button={
          <Link href={{ pathname: "/order/checkout" }}>
            <FilledButton>Procced to checkout</FilledButton>
          </Link>
        }
      />
    </div>
  );
}
