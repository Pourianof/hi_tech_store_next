import { Product, ProductVariation } from "@/core/models/product";

interface AddProductData {
  product: Product;
  variation: ProductVariation;
  amount?: number;
}

interface CartProductItemSpecifier {
  product: Product;
  variation: ProductVariation;
}

interface CartActionPayloads {
  Add: AddProductData;
  Decrease: AddProductData;
  Remove: CartProductItemSpecifier;
  Initialize: CartItemsState;
  Clear?: void | undefined;
  Loading: boolean;
  Error?: unknown;
  UpdateSuccession: boolean;
  Updating: boolean;
}

export interface CartItemState extends CartProductItemSpecifier {
  amount: number;
}
export interface CartItemsState<TCartItem = CartItemState> {
  items: TCartItem[];
}

export type CartState<TCartItem = CartItemState> = {
  cart: CartItemsState<TCartItem>;
  isLoading: boolean; // true until first initializing and between async mutations
  error?: unknown;
  isUpdateSucceed: boolean;
  isUpdating: boolean; // true along async mutations
};

export type CartActions = keyof CartActionPayloads;
export type CartPayloads<T extends CartActions> = CartActionPayloads[T];

function findProductVariation(
  target: Omit<CartItemState, "amount">,
  reverseFilter: boolean = false,
) {
  return (p: CartItemState) =>
    Boolean(
      +reverseFilter ^ // if reverseFilter is true then we want to find the negation of next condition
      +(
        p.product.productId == target.product.productId &&
        p.variation.color.colorId == target.variation.color.colorId
      ),
    );
}

export function cartReducer<T extends CartActions>(
  state: CartState,
  action: { action: T } & (T extends "Clear"
    ? { payload?: CartPayloads<T> }
    : { payload: CartPayloads<T> }),
): CartState {
  function copyItems(items: CartState["cart"]["items"] = state.cart.items) {
    return items.map((item) => ({ ...item }));
  }

  switch (action.action) {
    case "Add":
    case "Decrease": {
      const addedData = action.payload as AddProductData;
      if (!addedData || !addedData.product) {
        throw new Error("no product state provided for Cart Reducer");
      }

      const productIndexInList = state.cart.items.findIndex(
        findProductVariation(addedData),
      );

      const productInList = state.cart.items[productIndexInList];

      const addedAmount = addedData.amount ?? 1;

      if (productInList) {
        productInList.amount += addedAmount;

        return {
          ...state,
          cart: {
            ...state.cart,
            items:
              productInList.amount <= 0
                ? state.cart.items.filter((_, idx) => idx != productIndexInList)
                : state.cart.items,
          },
          isUpdateSucceed: true,
        };
      }

      // decrease of not existing item
      if (addedAmount < 0) {
        return state;
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          items: [
            ...copyItems(state.cart.items.map((item) => ({ ...item }))),
            {
              product: addedData.product,
              amount: addedAmount,
              variation: addedData.variation,
            },
          ],
        },
      };
    }
    case "Remove": {
      const removed = action.payload as CartProductItemSpecifier;

      return {
        ...state,
        cart: {
          items: copyItems(
            state.cart.items.filter(findProductVariation(removed, true)),
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
        isUpdateSucceed: true,
      };
    }

    case "Initialize": {
      return {
        isLoading: false,
        cart: {
          items: copyItems((action.payload as CartItemsState).items),
        },
        isUpdateSucceed: true,
        isUpdating: false,
      };
    }

    case "Loading": {
      return { ...state, isLoading: action.payload as boolean };
    }

    case "Error": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isUpdateSucceed: false,
        isUpdating: false,
      };
    }

    case "UpdateSuccession": {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        isUpdateSucceed: action.payload as boolean,
        isUpdating: false,
      };
    }

    case "Updating": {
      return {
        ...state,
        isUpdating: action.payload as boolean,
      };
    }
  }
}
