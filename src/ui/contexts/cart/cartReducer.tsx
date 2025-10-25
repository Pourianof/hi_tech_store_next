import { Product } from "@/core/models/product";

interface AddProductData {
  product: Product;
  amount?: number;
}

interface CartActionPayloads {
  Add: AddProductData;
  Decrease: Product;
  Remove: void;
}

export type CartActions = keyof CartActionPayloads;
export type CartPayloads<T extends CartActions> = CartActionPayloads[T];

export interface CartState {
  products: {
    product: Product;
    amount: number;
  }[];
}

export function cartReducer<T extends CartActions>(
  state: CartState,
  action: { action: T; payload: CartPayloads<T> }
): CartState {
  switch (action.action) {
    case "Add": {
      const addedData = action.payload as AddProductData;
      if (!addedData || !addedData.product) {
        throw new Error("no product state provided for Cart Reducer");
      }
      const productInList = state.products.find(
        (p) => p.product.productId == addedData.product.productId
      );

      const addedAmount = addedData.amount ?? 1;

      if (productInList) {
        productInList.amount += addedAmount;

        return { ...state };
      }

      state.products.push({
        product: addedData.product,
        amount: addedAmount,
      });

      return { ...state };
    }
    case "Decrease": {
      const addedData = action.payload as AddProductData;
      if (!addedData || !addedData.product) {
        throw new Error("no product state provided for Cart Reducer");
      }
      const productIndexInList = state.products.findIndex(
        (p) => p.product.productId == addedData.product.productId
      );

      if (productIndexInList < 0) {
        return state;
      }

      const productInList = state.products[productIndexInList];

      if (!--productInList.amount) {
        state.products.splice(productIndexInList, 1);
      }

      return {
        ...state,
      };
    }
    case "Remove": {
      return {
        products: [],
      };
    }
  }
}
