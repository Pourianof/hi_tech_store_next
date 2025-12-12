"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { CartPayloads, cartReducer, CartState } from "./cartReducer";
import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";
import toast from "react-hot-toast";
import { useLocalStorageChange } from "@/ui/hooks/useLocalStorage";
import {
  clearLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/ui/helpers/storageHelper";
import { useAuth } from "../authContext";

interface ICartContext extends CartState {
  actions: {
    addProductToCart(payload: CartPayloads<"Add">, toastNotif?: boolean): void;
    removeProductFromCart(payload: CartPayloads<"Remove">): void;
    decreaseAmountOfProduct(payload: CartPayloads<"Decrease">): void;
  };
}

const CartContext = createContext<ICartContext | undefined>(
  undefined as unknown as ICartContext
);

interface LocalStorageCartState extends CartState {
  isLoggedIn: boolean;
}

export const CART_KEY = "local_storage_key";

export function CartHandlerProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn, isLoading: isLogginStateLoading } = useAuth();

  const _context = useCart_();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  const logginStateRef = useRef(false);
  const shouldSaveRef = useRef(false);

  function save() {
    shouldSaveRef.current = true;
  }

  function noSave() {
    shouldSaveRef.current = false;
  }

  useLocalStorageChange({
    storageKey: CART_KEY,
    onChange(_context, newValue) {
      dispatch({
        action: "Initialize",
        payload: newValue
          ? JSON.parse(newValue)
          : ({ items: [], isLoggedIn } as CartState),
      });
      noSave();
    },
  });

  useEffect(() => {
    const cartState = getFromLocalStorage(CART_KEY) as LocalStorageCartState;
    if (cartState) {
      logginStateRef.current = cartState.isLoggedIn;
      dispatch({ action: "Initialize", payload: cartState });
    }
  }, []);

  useEffect(() => {
    if (shouldSaveRef.current) {
      saveToLocalStorage(CART_KEY, {
        ...state,
        isLoggedIn,
      });
    }
  }, [state, isLoggedIn]);

  useEffect(() => {
    if (isLogginStateLoading) {
      return;
    }

    if (logginStateRef.current == isLoggedIn) {
      return;
    }

    if (isLoggedIn) {
      // sync logout cart state with user cart
      if (state.items.length) {
      }
    } else {
      // clear the cart for privacy purpose
      clearLocalStorage(CART_KEY);
      dispatch({
        action: "Clear",
      });
    }
    logginStateRef.current = isLoggedIn;
  }, [isLoggedIn, isLogginStateLoading, state.items.length]);

  if (_context) {
    throw new Error("Cart context must define only one time in component tree");
  }

  // NOTE: The dispatch method will called twice on each invokation due to react StrictMode
  return (
    <CartContext.Provider
      value={{
        ...state,
        actions: {
          addProductToCart(payload, toastNotif: boolean = true) {
            dispatch({
              action: "Add",
              payload,
            });

            if (toastNotif) toast.success("Product added to cart successfully");
            save();
          },
          removeProductFromCart(payload) {
            dispatch({ action: "Remove", payload });
            save();
          },
          decreaseAmountOfProduct(payload) {
            dispatch({
              action: "Decrease",
              payload,
            });
            save();
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
