import { CartWithProduct } from "@/core/models/cart";
import { Product } from "@/core/models/product";

interface AddProductData {
  product: Product;
  amount?: number;
}

interface CartActionPayloads {
  Add: AddProductData;
  Decrease: Product;
  Remove: Product;
  Initialize: CartWithProduct;
  Clear?: void | undefined;
  Loading: boolean;
}

export type CartState = { cart: CartWithProduct; isLoading: boolean };

export type CartActions = keyof CartActionPayloads;
export type CartPayloads<T extends CartActions> = CartActionPayloads[T];

export function cartReducer<T extends CartActions>(
  state: CartState,
  action: { action: T } & (T extends "Clear"
    ? { payload?: CartPayloads<T> }
    : { payload: CartPayloads<T> })
): CartState {
  switch (action.action) {
    case "Add": {
      const addedData = action.payload as AddProductData;
      if (!addedData || !addedData.product) {
        throw new Error("no product state provided for Cart Reducer");
      }
      const productInList = state.cart.items.find(
        (p) => p.product.productId == addedData.product.productId
      );

      const addedAmount = addedData.amount ?? 1;

      if (productInList) {
        productInList.amount += addedAmount;

        return { ...state };
      }

      state.cart.items.push({
        product: addedData.product,
        amount: addedAmount,
      });

      return { ...state };
    }
    case "Decrease": {
      const addedData = action.payload as Product;
      if (!addedData || !addedData) {
        throw new Error("no product state provided for Cart Reducer");
      }
      const productIndexInList = state.cart.items.findIndex(
        (p) => p.product.productId == addedData.productId
      );

      if (productIndexInList < 0) {
        return state;
      }

      const productInList = state.cart.items[productIndexInList];

      if (!--productInList.amount) {
        state.cart.items.splice(productIndexInList, 1);
      }

      return {
        ...state,
      };
    }
    case "Remove": {
      return {
        ...state,
        cart: {
          items: state.cart.items.filter(
            (prod) =>
              prod.product.productId != (action.payload as Product).productId
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
          items: (action.payload as CartWithProduct).items,
        },
      };
    }

    case "Loading": {
      return { ...state, isLoading: action.payload as boolean };
    }
  }
}
