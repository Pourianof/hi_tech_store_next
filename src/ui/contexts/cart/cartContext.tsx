"use client";
import { Cart, CartWithProduct } from "@/core/models/cart";
import {
  getCartAction,
  updateCartAction,
} from "@/lib/server_actions/cartActions";
import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";
import {
  clearLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/ui/helpers/storageHelper";
import { useLocalStorageChange } from "@/ui/hooks/useLocalStorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import toast from "react-hot-toast";
import { useAuth } from "../authContext";
import { CartPayloads, cartReducer, CartState } from "./cartReducer";
import { convertCartWithProductToCartState } from "./typeHelper/convertCartDtoToCartState";
import { CartItem } from "@/core/models/cartItem";

interface ICartContext extends CartState<CartItem> {
  actions: {
    addProductToCart(payload: CartPayloads<"Add">, toastNotif?: boolean): void;
    removeProductFromCart(payload: CartPayloads<"Remove">): void;
    decreaseAmountOfProduct(payload: CartPayloads<"Decrease">): void;
  };
}

const CartContext = createContext<ICartContext | undefined>(
  undefined as unknown as ICartContext,
);

export const CART_KEY = "local_storage_key";
const CART_QUERY_KEY = "cart_query_key";

export function CartHandlerProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn, isLoading: isLogginStateLoading } = useAuth();

  const query = useQuery({
    queryKey: [CART_QUERY_KEY],
    enabled: isLoggedIn,
    refetchOnWindowFocus: isLoggedIn ? "always" : false,
    queryFn: async () => {
      if (!isLoggedIn) {
        return;
      }

      const result = await getCartAction();

      if (result.status == "failed") {
        return Promise.reject(result.data);
      }

      return convertCartWithProductToCartState(result.data);
    },
  });

  const {
    mutate: changeItemMutation,
    mutateAsync: changeItemMutationAndReturnResult,
  } = useMutation({
    meta: {
      oldState: {
        cart: query.data,
      },
    },
    mutationFn: async (changedItems: Cart["items"]) => {
      const result = await updateCartAction({ items: changedItems });
      if (result.status == "failed") {
        throw result.data;
      }

      return result.data;
    },
    onMutate: () => {
      dispatch({ action: "Loading", payload: true });
      changedItemProductIds.current = [];
    },
    onSettled: () => {
      dispatch({ action: "Loading", payload: false });
    },
    onSuccess: () => {
      // we updated item before in reducer
      toast.success("Product added to cart successfully");
    },
    onError(err, __, ___, ctx) {
      toast.error("Something went wrong add item to your cart");
      // undo state
      dispatch({
        action: "Initialize",
        payload: (ctx.meta!.oldState as CartState).cart,
      });
    },
  });

  const _context = useCart_();
  const [state, dispatch] = useReducer(cartReducer, {
    cart: {
      items: [],
    },
    isLoading: true,
  });

  const changedItemProductIds = useRef<
    { productId: number; variationId: number }[]
  >([]);

  useLocalStorageChange({
    storageKey: CART_KEY,
    onChange(_context, newValue) {
      dispatch({
        action: "Initialize",
        payload: newValue
          ? JSON.parse(newValue).cart
          : ({ items: [], isLoggedIn } as CartWithProduct),
      });
    },
  });

  const loggedInStateRef = useRef(false);

  // clear state when logout
  // just for multi-tab openinig
  useEffect(() => {
    if (isLogginStateLoading) {
      return;
    }

    if (!isLoggedIn && loggedInStateRef.current) {
      dispatch({ action: "Clear" });
    }

    loggedInStateRef.current = isLoggedIn;
  }, [isLoggedIn, isLogginStateLoading]);

  // Initializing state
  useEffect(() => {
    if (isLogginStateLoading) {
      return;
    }

    if (!state.isLoading) {
      return;
    }

    if (!isLoggedIn) {
      const cartState = getFromLocalStorage(CART_KEY) as CartState;
      if (cartState && cartState.cart) {
        dispatch({ action: "Initialize", payload: cartState.cart });
      }
      return;
    }
  }, [isLoggedIn, isLogginStateLoading, state.isLoading]);

  useEffect(() => {
    if (query.data) {
      dispatch({
        action: "Initialize",
        payload: query.data,
      });
    }
  }, [query.data]);

  // persist the cart state when is logout
  useEffect(() => {
    if (isLogginStateLoading) {
      return;
    }

    if (isLoggedIn) {
      return;
    }

    saveToLocalStorage(CART_KEY, state);
  }, [state, isLoggedIn, isLogginStateLoading]);

  // handle login state changing
  useEffect(() => {
    if (isLogginStateLoading) {
      return;
    }

    if (isLoggedIn) {
      clearLocalStorage(CART_KEY);
      // sync logout cart state with user cart
      if (state.cart.items.length) {
        changeItemMutationAndReturnResult(
          state.cart.items.map((item) => ({
            amount: item.amount,
            productVariationId: item.variation.productVariationId,
          })),
        ).then((cart) =>
          dispatch({
            action: "Initialize",
            payload: convertCartWithProductToCartState(cart),
          }),
        );
      } else {
        // if user is logged-in the always fetch from server
        // because the cart may change from other devices or sessions
        if (query.data) {
          dispatch({
            action: "Initialize",
            payload: query.data,
          });
        } else {
          query.refetch();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isLogginStateLoading]);

  useEffect(() => {
    if (!isLoggedIn) {
      changedItemProductIds.current = [];
      return;
    }

    if (!changedItemProductIds.current.length) {
      return;
    }

    const changedItems = changedItemProductIds.current.map(
      ({ productId, variationId }) => {
        return {
          productVariationId: variationId,
          amount:
            state.cart.items.find(
              (item) =>
                item.product.productId == productId &&
                item.variation.productVariationId == variationId,
            )?.amount ?? 0,
        };
      },
    );

    changeItemMutation(changedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isLoggedIn]);

  if (_context) {
    throw new Error("Cart context must define only one time in component tree");
  }

  // NOTE: The dispatch method will called twice on each invokation due to react StrictMode
  return (
    <CartContext.Provider
      value={{
        ...{
          ...state,
          cart: {
            items: state.cart.items.map(
              (ci) => new CartItem(ci.product, ci.variation, ci.amount),
            ),
          },
        },
        actions: {
          addProductToCart(payload) {
            if (isLogginStateLoading) {
              return;
            }
            dispatch({
              action: "Add",
              payload,
            });

            changedItemProductIds.current.push({
              productId: payload.product.productId,
              variationId: payload.variation.productVariationId,
            });
          },
          removeProductFromCart(payload) {
            if (isLogginStateLoading) {
              return;
            }
            dispatch({ action: "Remove", payload });
            changedItemProductIds.current.push({
              productId: payload.product.productId,
              variationId: payload.variation.productVariationId,
            });
          },
          decreaseAmountOfProduct(payload) {
            if (isLogginStateLoading) {
              return;
            }

            dispatch({
              action: "Decrease",
              payload,
            });

            changedItemProductIds.current.push({
              productId: payload.product.productId,
              variationId: payload.variation.productVariationId,
            });
          },
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart_() {
  try {
    const cart = useCart();
    return cart;
  } catch (err) {
    if (err instanceof NoContextDefinedError) {
      return undefined;
    }
  }
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new NoContextDefinedError("Cart");
  }

  return context;
}
