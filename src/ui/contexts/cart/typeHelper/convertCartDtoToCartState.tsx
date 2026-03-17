import { CartWithProduct, MinimalProductDto } from "@/core/models/cart";
import { Product, ProductVariation } from "@/core/models/product";
import { CartItemsState, CartItemState } from "@/ui/contexts/cart/cartReducer";

export function convertCartWithProductToCartState(
  cart: CartWithProduct,
): CartItemsState {
  return {
    items: cart.items
      .reduce<
        {
          variation: ProductVariation;
          amount: number;
          product: MinimalProductDto;
        }[]
      >(
        (prev, cur) => [
          ...prev,
          ...cur.variations.map((v) => ({
            variation: v.variation,
            amount: v.amount,
            product: cur,
          })),
        ],
        [],
      )
      .map(
        (item) =>
          ({
            amount: item.amount,
            variation: item.variation,
            product: item.product as unknown as Product,
          }) as CartItemState,
      ),
  };
}
