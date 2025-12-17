"use client";
import { CartItem } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import Icon from "@/ui/icons/icon";
import { Badge, Button } from "@mui/material";
import Link from "next/link";
import { CartItemBox } from "../order/cart/_components/cartItemBox";

export function CartBadge() {
  const {
    cart: { items: products },
  } = useCart();
  const cartItems = products.map(
    ({ amount, product }) => new CartItem(product, amount)
  );
  return (
    <div className="relative hover:[&>.cart-box]:opacity-100 hover:[&>.cart-box]:visible">
      <div className="w-[calc(calc(100dvw_*_0.6))] max-w-[350px] p-4 text-sm shadow-standard rounded-xl cart-box invisible opacity-0 duration-200 transition delay-100 bg-white absolute z-20 top-full right-0">
        <h4 className="text-lg border-b">
          <Icon name="cart" />
          Your cart
        </h4>
        {!!cartItems.length ? (
          <div className="flex flex-col gap-4 py-2 divide-y">
            {cartItems.map((cartItem) => (
              <CartItemBox
                key={cartItem.product.productId}
                cartItem={cartItem}
              />
            ))}
            <div className="flex items-center justify-between">
              <div>
                <span>Total price: </span>
                <span>
                  {cartItems.reduce((prev, cur) => prev + cur.finalPrice, 0)}
                </span>
              </div>
              <Link href={{ pathname: "/order/cart" }}>
                <Button variant="outlined" onClick={(e) => e.preventDefault()}>
                  Order now
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-max relative py-8">
            <Icon
              name="order_basket"
              className="text-8xl absolute top-1/2 left-1/2 -translate-1/2 opacity-10"
            />
            <span className="text-2xl">Cart is empty</span>
          </div>
        )}
      </div>
      <Link href={{ pathname: "/order/cart" }}>
        <Badge
          badgeContent={products.length}
          anchorOrigin={{
            vertical: "bottom",
          }}
          max={99}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              minWidth: "15px",
              width: "15px",
              height: "15px",
              fontSize: "10px",
            },
          }}
        >
          <Icon name="order_basket" />
        </Badge>
      </Link>
    </div>
  );
}
