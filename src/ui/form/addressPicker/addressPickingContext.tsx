import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";
import { ActionDispatch, createContext, ReactNode, useContext } from "react";
import {
  AddressPickingDispatchArg,
  AddressPickingState,
  Coordination,
} from "./addressPickingReducer";

interface AddressPickingContextState {
  state: AddressPickingState;
  actions: {
    addressIsLoading(): void;
    addressLoaded(): void;
    addressErrored(errorMessage: string): void;
    removeError(): void;
    addressChanged(newLocation: {
      address: string;
      coordination: Coordination;
    }): void;
  };
}

const AddressPickingContext = createContext<AddressPickingContextState>(
  {} as unknown as AddressPickingContextState
);

export const addressPickingInitialState: AddressPickingState = {
  isAddressLoading: false,
};

export function AddressPickingProvider({
  children,
  reducer: { dispatch, state },
}: {
  children: ReactNode;
  reducer: {
    state: AddressPickingState;
    dispatch: ActionDispatch<[AddressPickingDispatchArg]>;
  };
}) {
  return (
    <AddressPickingContext.Provider
      value={{
        state,
        actions: {
          addressIsLoading() {
            dispatch({
              action: "AddressLoading",
              payload: { isLoading: true },
            });
          },
          addressLoaded() {
            dispatch({
              action: "AddressLoading",
              payload: { isLoading: false },
            });
          },
          addressErrored(errorMessage) {
            dispatch({
              action: "addressLoadingError",
              payload: { message: errorMessage },
            });
          },
          removeError() {
            dispatch({
              action: "addressLoadingError",
              payload: { message: undefined },
            });
          },
          addressChanged(newLocation) {
            dispatch({
              action: "AddressChange",
              payload: {
                newAddress: newLocation.address,
                position: newLocation.coordination,
              },
            });
          },
        },
      }}
    >
      {children}
    </AddressPickingContext.Provider>
  );
}

export function useAddressPicking() {
  const context = useContext(AddressPickingContext);

  if (!context) {
    throw new NoContextDefinedError("AddressPicking");
  }

  return context;
}
