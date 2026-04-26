import { CartDetails } from "./_components/cartDetail";
import { CartList } from "./_components/cartList";

export default function DefaultCartPage() {
  return (
    <div className="flex flex-col desktop:flex-row items-start desktop:gap-20 relative">
      <CartList />
      <CartDetails />
    </div>
  );
}
