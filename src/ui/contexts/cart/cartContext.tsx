import { createContext, ReactNode, useContext, useReducer } from "react";
import { CartPayloads, cartReducer, CartState } from "./cartReducer";
import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";

interface ICartContext extends CartState {
  actions: {
    addProductToCart(payload: CartPayloads<"Add">): void;
    removeProductFromCart(payload: CartPayloads<"Remove">): void;
    decreaseAmountOfProduct(payload: CartPayloads<"Decrease">): void;
  };
}

const CartContext = createContext<ICartContext>({} as unknown as ICartContext);

export function CartHandlerProvider({ children }: { children: ReactNode }) {
  const _context = useCart();
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
  });

  if (_context) {
    throw new Error("Cart context must define only one time in component tree");
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        actions: {
          addProductToCart(payload) {
            dispatch({
              action: "Add",
              payload,
            });
          },
          removeProductFromCart(payload) {
            dispatch({
              action: "Decrease",
              payload,
            });
          },
          decreaseAmountOfProduct(payload) {
            dispatch({ action: "Remove", payload });
          },
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new NoContextDefinedError("Cart");
  }

  return context;
}
