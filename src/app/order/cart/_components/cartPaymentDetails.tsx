"use client";
import { CartItem } from "@/core/models/cartItem";
import { DiscountAction } from "@/core/models/discount";
import { DiscountActionType } from "@/core/schemas/discountCodeSchema";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
import { useDiscountCodeContext } from "../../payment/_contexts/discountCodeContext";

export function CartPaymentDetails({
  shipmentCost,
}: {
  shipmentCost?: number;
}) {
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
    <Column className="gap-10px">
      <Column className="text-gray-neutral-71 gap-8px">
        <Row className=" justify-between">
          <Body size="sm">Subtotal</Body>
          <Body size="sm">${cartPrice}</Body>
        </Row>
        {hasAppliedDiscount && (
          <div className="flex justify-between font-bold">
            <span>Discount: </span>

            <Row centerV>
              <span className="text-yellow-600">
                {discountValue}
                {discountType == DiscountActionType.FIXED ? "$" : "%"}
              </span>
              <span>→</span>
              <span className="text-sm font-normal">{discountAmount}$</span>
            </Row>
          </div>
        )}
        <Row className="justify-between">
          <Body size="sm">Shipment cost</Body>
          <Body size="sm">${shipmentCost ?? "-"}</Body>
        </Row>
      </Column>

      <div className="border-t-1 py-2 mt-2 border-t-gray-neutral-b4 flex justify-between font-semibold">
        <span className="">Grand total</span>
        <span>
          {hasAppliedDiscount && (
            <span className="line-through text-sm mx-2 text-gray-neutral-71">
              ${cartPrice}
            </span>
          )}
          $
          {(hasAppliedDiscount ? discountedCartPrice : cartPrice) +
            (shipmentCost ?? 0)}
        </span>
      </div>
    </Column>
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
