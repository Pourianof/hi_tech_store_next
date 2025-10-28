import { CartItem } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";

export function CartPaymentDetails() {
  const { items } = useCart();
  const cartItems = items.map(
    (item) => new CartItem(item.product, item.amount)
  );
  const cartPrice = cartItems.reduce((prev, cur) => prev + cur.finalPrice, 0);

  return (
    <div className="my-8">
      <div className="text-gray-neutral-71 flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${cartPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between">
          <span>Shipment cost</span>
          <span>$22.50</span>
        </div>
      </div>
      <div className="border-t-1 py-2 mt-2 border-t-gray-neutral-b4 flex justify-between font-semibold">
        <span className="">Grand total</span>
        <span>${cartPrice + 22.5}</span>
      </div>
    </div>
  );
}
