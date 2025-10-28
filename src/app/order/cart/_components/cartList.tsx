"use client";

import { CartItem as CI } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { CartItemBox } from "./cartItemBox";
import Link from "next/link";
import { CartPaymentDetails } from "./cartPaymentDetails";
import { FilledButton } from "@/ui/form/AppButtons";

export function CartList() {
  const { items } = useCart();
  const cartItems = items.map((item) => new CI(item.product, item.amount));

  if (!items.length) {
    return (
      <div className="my-10 bg-slate-300 rounded-lg p-8 flex flex-col gap-4 justify-center items-center">
        <h4 className="text-2xl font-semibold text-orange-500">
          Cart is empty
        </h4>
        <p className="">
          Go to{" "}
          <Link
            className="font-bold text-primary-blue-0c underline"
            href={{ pathname: "/products" }}
          >
            Products
          </Link>{" "}
          page to add some items to your cart
        </p>
      </div>
    );
  }
  return (
    <div className="mt-12">
      {cartItems.map((item, index) => (
        <div key={index} className="shadow-light rounded-2xl">
          <CartItemBox cartItem={item} variant="large" />
        </div>
      ))}
      <CartPaymentDetails />
      <Link href={{ pathname: "/order/checkout" }}>
        <FilledButton>Procced to checkout</FilledButton>
      </Link>
    </div>
  );
}
