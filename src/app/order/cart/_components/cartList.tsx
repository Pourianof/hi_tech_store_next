"use client";

import { CartItem as CI } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Card } from "@/ui/theme/card";
import { CartItemBox } from "./cartItemBox";

export function CartList() {
  const {
    isLoading,
    cart: { items },
  } = useCart();
  const cartItems = items.map(
    (item) => new CI(item.product, item.variation, item.amount),
  );

  if (isLoading) {
    return (
      <Column center className="w-full gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i} className="w-full">
            <Row className="gap-4">
              <Column
                center
                className="w-1/4 aspect-square bg-gray-200 rounded"
              >
                <Icon name="image" className="text-6xl text-gray-600" />
              </Column>
              <Column className="grow gap-6">
                <div className="w-full h-4 bg-gray-200 rounded-lg"></div>
                <Column className="gap-2">
                  <div className="w-20 h-4 bg-gray-200 rounded-lg"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded-lg"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded-lg"></div>
                </Column>
              </Column>
            </Row>
          </Card>
        ))}
      </Column>
    );
  }
  return (
    <Column className="gap-24px desktop:grow">
      {cartItems.map((item, index) => (
        <CartItemBox key={index} cartItem={item} variant="large" />
      ))}
    </Column>
  );
}
