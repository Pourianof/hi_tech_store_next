import { CartWithProduct } from "@/core/models/cart";
import { Product, ProductVariation } from "@/core/models/product";

interface AddProductData {
  product: Product;
  variation: ProductVariation;
  amount?: number;
}

interface CartActionPayloads {
  Add: AddProductData;
  Decrease: AddProductData;
  Remove: Product;
  Initialize: CartWithProduct;
  Clear?: void | undefined;
  Loading: boolean;
}

interface CartItemsState {
  items: {
    product: Product;
    amount: number;
    variation: ProductVariation;
  }[];
}

export type CartState = {
  cart: CartItemsState;
  isLoading: boolean;
};

export type CartActions = keyof CartActionPayloads;
export type CartPayloads<T extends CartActions> = CartActionPayloads[T];

export function cartReducer<T extends CartActions>(
  state: CartState,
  action: { action: T } & (T extends "Clear"
    ? { payload?: CartPayloads<T> }
    : { payload: CartPayloads<T> }),
): CartState {
  switch (action.action) {
    case "Add":
    case "Decrease": {
      const addedData = action.payload as AddProductData;
      if (!addedData || !addedData.product) {
        throw new Error("no product state provided for Cart Reducer");
      }

      const productIndexInList = state.cart.items.findIndex(
        (p) =>
          p.product.productId == addedData.product.productId &&
          !!p.product.variations.find(
            (pv) => addedData.variation.color.colorId == pv.color.colorId,
          ),
      );

      const productInList = state.cart.items.at(productIndexInList);

      const addedAmount = addedData.amount ?? 1;

      if (productInList) {
        productInList.amount += addedAmount;

        if (productInList.amount <= 0) {
          state.cart.items.splice(productIndexInList, 1);
        }

        return { ...state };
      }

      // decrease of not existing item
      if (addedAmount < 0) {
        return state;
      }

      state.cart.items.push({
        product: addedData.product,
        amount: addedAmount,
        variation: addedData.variation,
      });

      return { ...state };
    }
    case "Remove": {
      return {
        ...state,
        cart: {
          items: state.cart.items.filter(
            (prod) =>
              prod.product.productId != (action.payload as Product).productId,
          ),
        },
      };
    }
    case "Clear": {
      return {
        ...state,
        cart: {
          items: [],
        },
      };
    }

    case "Initialize": {
      return {
        isLoading: false,
        cart: {
          items: (action.payload as CartItemsState).items,
        },
      };
    }

    case "Loading": {
      return { ...state, isLoading: action.payload as boolean };
    }
  }
}
