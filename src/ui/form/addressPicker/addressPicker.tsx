"use client";
import { CircularProgress } from "@mui/material";
import {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useReducer,
  useState,
} from "react";
import GoogleMapPicker from "../../GoogleMapPicker";
import Icon from "../../icons/icon";
import { Modal } from "../../modal/modal";
import { FilledButton } from "../AppButtons";
import {
  addressPickingInitialState,
  AddressPickingProvider,
  useAddressPicking,
} from "./addressPickingContext";
import { addressPickingReducer } from "./addressPickingReducer";

interface AddressPickerProps {
  onCancel: VoidFunction;
  onConfirm: (address: string) => void;
}

export function AddressPicker(props: AddressPickerProps) {
  const [state, dispatch] = useReducer(
    addressPickingReducer,
    addressPickingInitialState
  );

  return (
    <AddressPickingProvider reducer={{ dispatch, state }}>
      <AddressPicker_ {...props} />
    </AddressPickingProvider>
  );
}

function AddressPicker_({ onCancel, onConfirm }: AddressPickerProps) {
  const { state } = useAddressPicking();

  return (
    <Modal
      variants="full-page"
      onClose={onCancel}
      noPadding
      diableScroll={false}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center p-4 justify-between">
          <h5>Edit address</h5>
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
            <Icon name="circular_close" className="text-2xl" />
          </button>
        </div>
        <div className="relative grow">
          {state.isAddressLoading ? (
            <div className="absolute top-2 w-[80%] z-10 bg-white left-1/2 -translate-x-1/2 rounded-xl p-4 text-sm flex gap-4 items-center">
              <CircularProgress size="30px" />
              Is loading...
            </div>
          ) : (
            !!state.address && (
              <ExpandOnFocusInput
                className="absolute top-2 w-[80%] z-10 bg-white left-1/2 -translate-x-1/2 rounded-xl p-4 text-sm"
                value={state.address}
                readOnly
              />
            )
          )}
          <GoogleMapPicker className="h-full" />
        </div>
        <div className="p-6">
          <FilledButton
            disabled={!state.address}
            onClick={() => {
              onConfirm(state.address!);
            }}
          >
            Confirm and Continue
          </FilledButton>
        </div>
      </div>
    </Modal>
  );
}

function ExpandOnFocusInput({
  className,
  ...props
}: DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>) {
  const [isFocused, setIsFocused] = useState(false);

  function focus() {
    setIsFocused(true);
  }

  function blur() {
    setIsFocused(false);
  }

  return (
    <div className={className}>
      <textarea
        {...props}
        dir="auto"
        onFocus={focus}
        onBlur={blur}
        rows={isFocused ? undefined : 1}
        aria-multiline={isFocused ? "true" : "false"}
        className={"resize-none w-full h-fit overflow-hidden"}
      ></textarea>
    </div>
  );
}
