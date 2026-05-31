"use client";
import { CartItemBox } from "@/app/order/cart/_components/cartItemBox";
import { CartItem } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { FilledButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Card } from "@/ui/theme/card";
import { Body } from "@/ui/theme/text/body";
import { H6 } from "@/ui/theme/text/headers";
import { Badge, CircularProgress } from "@mui/material";
import Link from "next/link";
import { HeaderModalHoverZone } from "./headerModal";

export function CartBadge() {
  const {
    cart: { items: products },
    isLoading,
  } = useCart();

  return (
    <HeaderModalHoverZone name="cart" modalContent={<CartModal />}>
      <Link href={{ pathname: "/order/cart" }}>
        {isLoading ? (
          <div className="relative">
            <Icon name="order_basket" />
            <Row
              className="absolute right-0 bottom-0 translate-1/2 rounded-full bg-stone-300 w-[14px] h-[14px]"
              center
            >
              <CircularProgress size={10} />
            </Row>
          </div>
        ) : (
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
        )}
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
      className="w-[512px] p-4 text-sm max-h-[calc(100dvh_-_75px_-_100px)] flex rounded-none rounded-b-md bg-white"
    >
      {!!cartItems.length ? (
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 py-2 flex-[1]">
          <Body size="lg">
            {cartItems.length} Item{cartItems.length > 1 ? "s" : ""}
          </Body>
          <Column className="overflow-auto">
            {cartItems.map((cartItem) => (
              <CartItemBox
                key={cartItem.product.productId}
                cartItem={cartItem}
              />
            ))}
          </Column>
          <Row className="items-center justify-between pt-2">
            <Column centerH className="px-6 gap-1">
              <Body size="sm">Total price: </Body>
              <H6 className="font-semibold">
                {cartItems
                  .reduce((prev, cur) => prev + cur.finalPrice, 0)
                  .toFixed(2)}
              </H6>
            </Column>
            <Link href={{ pathname: "/order/cart" }} className="grow">
              <FilledButton>
                Proceed to cart <Icon name="cart" className="text-2xl" />
              </FilledButton>
            </Link>
          </Row>
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
