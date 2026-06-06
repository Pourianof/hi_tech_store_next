"use client";
import { Product, ProductVariation } from "@/core/models/product";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { OutlinedButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";

export function AddToCartButton({
  product,
  variation,
}: {
  product: Product;
  variation: ProductVariation;
}) {
  const cartContext = useCart();

  return (
    <Column className="hidden md:group-hover:block relative">
      <OutlinedButton
        onClick={() => {
          cartContext.actions.addProductToCart({ product, variation });
        }}
      >
        <Row centerV className="gap-2">
          <Icon name="cart" />
          Add to cart
        </Row>
      </OutlinedButton>
    </Column>
  );
}
