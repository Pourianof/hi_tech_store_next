"use client";
import { Wrapper } from "@/app/_shared/wrapper";
import { captalize } from "@/lib/helpers/stringHelpers";
import { StatefulForm } from "@/ui/form/statefulForm";
import Icon from "@/ui/icons/icon";
import { Modal } from "@/ui/modal/modal";
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import { CheckoutSectionHeader } from "./checkoutSectionHeader";
import { AddressPicker } from "@/ui/form/addressPicker/addressPicker";
import { SimpleCheckBox } from "@/ui/form/simpleCheckBox";
import { useFormContext } from "react-hook-form";

export function ShippinhMethodInput() {
  const { data } = useSession();
  const [displayAddressForm, setDisplayAddressPage] = useState(false);
  return (
    <div>
      {displayAddressForm && (
        <Modal
          variants="full-page"
          onClose={() => {
            setDisplayAddressPage(false);
          }}
          noPadding
        >
          <UserAddressPageForm onClose={() => setDisplayAddressPage(false)} />
        </Modal>
      )}
      <CheckoutSectionHeader text="Ship to" />
      <div className="flex items-center bg-gray-neutral-f9 p-3 rounded-xl  justify-between">
        <input
          className="text-gray-neutral-50"
          readOnly
          disabled
          value={`${captalize(data?.user.name)} ${data?.user.lastName}`}
        />
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setDisplayAddressPage(true);
          }}
        >
          <Icon name="edit" className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

function UserAddressPageForm({ onClose }: { onClose: VoidFunction }) {
  const [displayMap, setDisplayMap] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  function closeMap() {
    setDisplayMap(false);
  }

  function showMap() {
    setDisplayMap(true);
  }

  function close(e: MouseEvent) {
    e.preventDefault();
    onClose();
  }

  return (
    <Wrapper className="h-full">
      {displayMap && (
        <AddressPicker
          onCancel={closeMap}
          onConfirm={(address) => {
            setUserAddress(address);
            closeMap();
          }}
        />
      )}
      <div className="flex flex-col gap-4 h-full pt-4">
        <div className="flex items-center gap-4">
          <button className="cursor-pointer" onClick={close}>
            <Icon name="circular_left_arrow" className="text-2xl" />
          </button>
          <h4>Address details</h4>
          <button className="ms-auto cursor-pointer" onClick={close}>
            <Icon name="circular_close" className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-col overflow-auto">
          <span className="text-gray-neutral-71 text-xs">
            Enter your details
          </span>
          <StatefulForm
            onSubmit={StatefulForm.SuccessSubmit}
            onSubmitionSuccessful={() => {}}
          >
            <TextField label="Full name" />
            <TextField label="Phone number" type="tel" />
            <TextField
              dir="auto"
              label="Your full address"
              type="text"
              value={userAddress}
            />
            <button
              className="text-primary-blue-0c text-sm cursor-pointer text-left"
              onClick={(e) => {
                e.preventDefault();
                showMap();
              }}
            >
              Or select from map
            </button>
            <div className="flex gap-3">
              <TextField label="Your full address" type="text" />
              <TextField label="Your full address" type="text" />
            </div>
            <TextField label="Postal code" type="text" />

            <SimpleCheckBox
              fieldName={USER_IS_RECEPIENT_KEY}
              label={"I am the recipient of my order"}
              defaultValue={true}
            />
            <RecepientSubForm />
          </StatefulForm>
        </div>
      </div>
    </Wrapper>
  );
}

const USER_IS_RECEPIENT_KEY = "user-is-recepient";

function RecepientSubForm() {
  const { watch } = useFormContext();
  const isUserIsRecepient = watch(USER_IS_RECEPIENT_KEY);

  return (
    <div>
      <TextField disabled={isUserIsRecepient} />
      <TextField disabled={isUserIsRecepient} />
    </div>
  );
}
