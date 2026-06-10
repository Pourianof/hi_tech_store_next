"use client";
import { Cart, CartWithProduct } from "@/core/models/cart";
import { CartItem } from "@/core/models/cartItem";
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
  useState,
} from "react";
import { useAuth } from "../authContext";
import { CartPayloads, cartReducer, CartState } from "./cartReducer";
import { convertCartWithProductToCartState } from "./typeHelper/convertCartDtoToCartState";

// Cart State
// 1- if user is logged-out, save cart in localstorage
// 2- if user logged-in, merge the user local cart with server cart
// 3- after user logged-in, all state will store remotely
// 4- if user logged-out after login, cart get empty

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

  const [loginSyncCompleted, setLoginSyncCompleted] = useState(false);

  const loginSyncing = useRef(false); // handle first login syncing → sync local state to remote

  const query = useQuery({
    queryKey: [CART_QUERY_KEY],
    enabled: isLoggedIn && loginSyncCompleted,
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

  const { mutateAsync: changeItemMutationAndReturnResult } = useMutation({
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
      dispatch({ action: "Updating", payload: true });
    },
    onSettled: () => {
      dispatch({ action: "Loading", payload: false });
      dispatch({ action: "Updating", payload: false });
    },
    onSuccess: () => {
      dispatch({
        action: "UpdateSuccession",
        payload: true,
      });
    },
    onError(err, __, ___, ctx) {
      // undo state
      dispatch({
        action: "Initialize",
        payload: (ctx.meta!.oldState as CartState).cart,
      });
      dispatch({
        action: "Error",
        payload: err,
      });
    },
  });

  const _context = useCart_();
  const [state, dispatch] = useReducer(cartReducer, {
    cart: {
      items: [],
    },
    isLoading: true,
    isUpdateSucceed: true,
    isUpdating: false,
  });

  const dirtyItems = useRef(new Set<number>());

  const cartRef = useRef(state.cart.items);

  useEffect(() => {
    cartRef.current = state.cart.items;
  }, [state.cart.items]);

  const syncing = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const flush = async () => {
    if (loginSyncing.current) {
      return;
    }

    if (syncing.current) {
      return;
    }

    if (!dirtyItems.current.size) {
      return;
    }

    syncing.current = true;

    const variationIds = [...dirtyItems.current];

    dirtyItems.current.clear();

    const payload = variationIds.map((variationId) => ({
      productVariationId: variationId,
      amount:
        cartRef.current.find(
          (x) => x.variation.productVariationId === variationId,
        )?.amount ?? 0,
    }));

    try {
      await changeItemMutationAndReturnResult(payload);
    } finally {
      syncing.current = false;

      // if something change between syncing
      if (dirtyItems.current.size) {
        flush();
      }
    }
  };

  const scheduleSync = () => {
    if (loginSyncing.current) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      flush();
    }, 300);
  };

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
      dirtyItems.current.clear();
      setLoginSyncCompleted(false);
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
      if (cartRef.current.length) {
        loginSyncing.current = true;
        changeItemMutationAndReturnResult(
          cartRef.current.map((item) => ({
            amount: item.amount,
            productVariationId: item.variation.productVariationId,
          })),
        )
          .then((cart) =>
            dispatch({
              action: "Initialize",
              payload: convertCartWithProductToCartState(cart),
            }),
          )
          .finally(() => {
            loginSyncing.current = false;
            setLoginSyncCompleted(true);

            flush();
          });
      } else {
        // if user is logged-in the always fetch from server
        // because the cart may change from other devices or sessions
        if (query.data) {
          dispatch({
            action: "Initialize",
            payload: query.data,
          });
        } else {
          setLoginSyncCompleted(true); // make this true cause enable query
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isLogginStateLoading]);

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

            dirtyItems.current.add(payload.variation.productVariationId);

            if (isLoggedIn) scheduleSync();
          },
          removeProductFromCart(payload) {
            if (isLogginStateLoading) {
              return;
            }
            dispatch({ action: "Remove", payload });
            dirtyItems.current.add(payload.variation.productVariationId);

            if (isLoggedIn) scheduleSync();
          },
          decreaseAmountOfProduct(payload) {
            if (isLogginStateLoading) {
              return;
            }

            dispatch({
              action: "Decrease",
              payload,
            });

            dirtyItems.current.add(payload.variation.productVariationId);

            if (isLoggedIn) scheduleSync();
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
