import { Product } from "@/core/models/product";

interface AddProductData {
  product: Product;
  amount?: number;
}

interface CartActionPayloads {
  Add: AddProductData;
  Decrease: Product;
  Remove: Product;
  Initialize: CartState;
}

export type CartActions = keyof CartActionPayloads;
export type CartPayloads<T extends CartActions> = CartActionPayloads[T];

export interface CartState {
  items: {
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
      const productInList = state.items.find(
        (p) => p.product.productId == addedData.product.productId
      );

      const addedAmount = addedData.amount ?? 1;

      if (productInList) {
        productInList.amount += addedAmount;

        return { ...state };
      }

      state.items.push({
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
      const productIndexInList = state.items.findIndex(
        (p) => p.product.productId == addedData.productId
      );

      if (productIndexInList < 0) {
        return state;
      }

      const productInList = state.items[productIndexInList];

      if (!--productInList.amount) {
        state.items.splice(productIndexInList, 1);
      }

      return {
        ...state,
      };
    }
    case "Remove": {
      return {
        items: state.items.filter(
          (prod) =>
            prod.product.productId != (action.payload as Product).productId
        ),
      };
    }

    case "Initialize": {
      return action.payload as CartState;
    }
  }
}
