"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { CartPayloads, cartReducer, CartState } from "./cartReducer";
import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";
import toast from "react-hot-toast";

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

export function CartHandlerProvider({ children }: { children: ReactNode }) {
  const _context = useCart_();
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
  });

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
          },
          removeProductFromCart(payload) {
            dispatch({ action: "Remove", payload });
          },
          decreaseAmountOfProduct(payload) {
            dispatch({
              action: "Decrease",
              payload,
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
