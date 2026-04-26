"use client";

import { CartItem as CI } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { CartItemBox } from "./cartItemBox";
import Link from "next/link";
import { Column } from "@/ui/layouts/column";
import { H4 } from "@/ui/theme/text/headers";

export function CartList() {
  const {
    cart: { items },
  } = useCart();
  const cartItems = items.map(
    (item) => new CI(item.product, item.variation, item.amount),
  );

  if (!items.length) {
    return (
      <Column className="my-10 bg-slate-300 rounded-lg p-8 gap-4 justify-center items-center">
        <H4 className="text-2xl font-semibold text-orange-500">
          Cart is empty
        </H4>
        <p>
          Go to{" "}
          <Link
            className="font-bold text-primary-blue-0c underline"
            href={{ pathname: "/products" }}
          >
            Products
          </Link>{" "}
          page to add some items to your cart
        </p>
      </Column>
    );
  }
  return (
    <Column className="gap-24px">
      {cartItems.map((item, index) => (
        <CartItemBox key={index} cartItem={item} variant="large" />
      ))}
    </Column>
  );
}
