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
  Error?: CartError;
  UpdateSuccession: boolean;
  Updating: boolean;
}

export interface CartItemState extends CartProductItemSpecifier {
  amount: number;
}
export interface CartItemsState<TCartItem = CartItemState> {
  items: TCartItem[];
}

type CartError = { title: string; detail?: string };
export type CartState<TCartItem = CartItemState> = {
  cart: CartItemsState<TCartItem>;
  isLoading: boolean; // true until first initializing and between async mutations
  error?: CartError;
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

function overflowAmountErrorBuilder() {
  return {
    title: "Update failed",
    detail: "Cannot add items amount more than inventory of item",
  };
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
        const totalAddedAmount = productInList.amount + addedAmount;

        if (totalAddedAmount > productInList.variation.inventory) {
          return {
            ...state,
            error: overflowAmountErrorBuilder(),
            isUpdateSucceed: false,
          };
        }

        productInList.amount = totalAddedAmount;
        return {
          ...state,
          cart: {
            ...state.cart,
            items:
              productInList.amount <= 0
                ? state.cart.items.filter((_, idx) => idx != productIndexInList)
                : copyItems(state.cart.items),
          },
          isUpdateSucceed: true,
          error: undefined,
        };
      }

      // decrease of not existing item
      if (addedAmount < 0) {
        return state;
      }

      if (addedAmount > addedData.variation.inventory) {
        return {
          ...state,
          error: overflowAmountErrorBuilder(),
          isUpdateSucceed: false,
        };
      }

      return {
        ...state,
        isUpdateSucceed: true,
        error: undefined,
        cart: {
          ...state.cart,
          items: [
            ...copyItems(state.cart.items),
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
        error: undefined,
        isUpdateSucceed: true,
      };
    }
    case "Clear": {
      return {
        ...state,
        cart: {
          items: [],
        },
        isUpdateSucceed: true,
        error: undefined,
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
        error: undefined,
      };
    }

    case "Loading": {
      return { ...state, isLoading: action.payload as boolean };
    }

    case "Error": {
      return {
        ...state,
        isLoading: false,
        error: action.payload as CartError,
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
