"use client";
import { CartItem } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { useDiscountCodeContext } from "../../payment/_contexts/discountCodeContext";
import { DiscountActionType } from "@/core/schemas/discountCodeSchema";
import { DiscountAction } from "@/core/models/discount";

export function CartPaymentDetails() {
  const {
    cart: { items },
  } = useCart();
  const cartItems = items.map(
    (item) => new CartItem(item.product, item.variation, item.amount),
  );
  const cartPrice = cartItems.reduce((prev, cur) => prev + cur.finalPrice, 0);
  const discountCodeContext = useDiscountCodeContext();

  const hasAppliedDiscount = !!discountCodeContext?.discount;
  const discountType = discountCodeContext?.discount?.action.type;
  const discountValue = discountCodeContext?.discount?.action.value;

  const discountAmount = calculateDiscountAmount(
    cartPrice,
    hasAppliedDiscount
      ? {
          type: discountType!,
          value: discountValue!,
        }
      : undefined,
  );

  const discountedCartPrice = cartPrice - discountAmount;
  return (
    <div className="my-8">
      <div className="text-gray-neutral-71 flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${cartPrice}</span>
        </div>
        {hasAppliedDiscount && (
          <div className="flex justify-between font-bold">
            <span>Discount: </span>

            <div className="flex items-center gap-1">
              <span className="text-yellow-600">
                {discountValue}
                {discountType == DiscountActionType.FIXED ? "$" : "%"}
              </span>
              <span>→</span>
              <span className="text-sm font-normal">{discountAmount}$</span>
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipment cost</span>
          <span>$22.50</span>
        </div>
      </div>

      <div className="border-t-1 py-2 mt-2 border-t-gray-neutral-b4 flex justify-between font-semibold">
        <span className="">Grand total</span>
        <span>
          {hasAppliedDiscount && (
            <span className="line-through text-sm mx-2 text-gray-neutral-71">
              ${cartPrice}
            </span>
          )}
          ${(hasAppliedDiscount ? discountedCartPrice : cartPrice) + 22.5}
        </span>
      </div>
    </div>
  );
}

function calculateDiscountAmount(
  cartPrice: number,
  discount?: DiscountAction,
): number {
  if (!discount) {
    return 0;
  }

  const { type, value } = discount;
  if (type == DiscountActionType.FIXED) {
    return value;
  }

  return cartPrice * (value / 100);
}
