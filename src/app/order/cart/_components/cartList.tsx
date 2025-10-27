"use client";

import { CartItem as CI } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { CartItemBox } from "./cartItemBox";
import { FilledButton } from "@/ui/form/AppButtons";
import Link from "next/link";

export function CartList() {
  const { items } = useCart();
  const cartItems = items.map((item) => new CI(item.product, item.amount));
  const cartPrice = cartItems.reduce((prev, cur) => prev + cur.finalPrice, 0);

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
        <Link href={{ pathname: "/order/checkout" }}>
          <FilledButton>Procced to checkout</FilledButton>
        </Link>
      </div>
    </div>
  );
}
