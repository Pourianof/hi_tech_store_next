"use client";
import { CartItemBox } from "@/app/order/cart/_components/cartItemBox";
import { CartItem } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import Icon from "@/ui/icons/icon";
import { Card } from "@/ui/theme/card";
import { Badge, Button } from "@mui/material";
import Link from "next/link";
import { HeaderModalHoverZone } from "./headerModal";

export function CartBadge() {
  const {
    cart: { items: products },
  } = useCart();

  return (
    <HeaderModalHoverZone name="cart" modalContent={<CartModal />}>
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
    </HeaderModalHoverZone>
  );
}

function CartModal() {
  const {
    cart: { items: products },
  } = useCart();
  const cartItems = products.map(
    ({ amount, product, variation }) =>
      new CartItem(product, variation, amount),
  );

  return (
    <Card
      noHoverReaction
      className="w-[512px] p-4 text-sm rounded-none rounded-b-md bg-white translate-y-[1px]"
      noShadow
    >
      <h4 className="text-lg border-b pb-2">
        <Icon name="cart" />
        Your cart
      </h4>
      {!!cartItems.length ? (
        <div className="flex flex-col gap-4 py-2 divide-y">
          {cartItems.map((cartItem) => (
            <CartItemBox key={cartItem.product.productId} cartItem={cartItem} />
          ))}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span>Total price: </span>
              <span className="font-semibold">
                {cartItems
                  .reduce((prev, cur) => prev + cur.finalPrice, 0)
                  .toFixed(2)}
              </span>
            </div>
            <Link href={{ pathname: "/order/cart" }}>
              <Button variant="outlined" size="small">
                Order now
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-max relative py-8 mx-auto">
          <Icon
            name="order_basket"
            className="text-8xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
          />
          <span className="text-2xl">Cart is empty</span>
        </div>
      )}
    </Card>
  );
}
