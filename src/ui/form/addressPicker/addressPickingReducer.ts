export interface Coordination {
  lat: number;
  lng: number;
}

interface AddressPickingActionPayloadMap {
  AddressLoading: { isLoading: boolean };
  AddressChange: { newAddress: string; position: Coordination };
  addressLoadingError: { message?: string };
}

export interface AddressPickingState {
  isAddressLoading: boolean;
  address?: string;
  position?: Coordination;
  addressError?: string;
}

type AddressPickingActions = keyof AddressPickingActionPayloadMap;

export type AddressPickingDispatchArg = {
  action: AddressPickingActions;
  payload: AddressPickingActionPayloadMap[AddressPickingActions];
};

export function addressPickingReducer(
  prevState: AddressPickingState,
  { action, payload }: AddressPickingDispatchArg
): AddressPickingState {
  switch (action) {
    case "AddressLoading": {
      return {
        ...prevState,
        isAddressLoading: (
          payload as AddressPickingActionPayloadMap["AddressLoading"]
        ).isLoading,
      };
    }
    case "AddressChange": {
      const p = payload as AddressPickingActionPayloadMap["AddressChange"];
      return {
        isAddressLoading: false,
        address: p.newAddress,
        position: p.position,
      };
    }
    case "addressLoadingError": {
      const p =
        payload as AddressPickingActionPayloadMap["addressLoadingError"];
      return {
        ...prevState,
        isAddressLoading: false,
        addressError: p.message,
      };
    }
  }
}
