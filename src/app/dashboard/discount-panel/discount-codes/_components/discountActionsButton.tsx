"use client";
import { DiscountCode } from "@/core/models/discount";
import { ActionMenu, MenuButtonItem } from "@/ui/buttons/actionMenu";
import { Column } from "@/ui/layouts/column";
import { CircularProgress } from "@mui/material";
import { useDiscountMutations } from "./hooks/useDiscountMutations";

type Props = {
  discount: DiscountCode;
};

export function DiscountActionsButton({ discount }: Props) {
  const { discountCode, isDeactivating, isLoading, toggleActivation } =
    useDiscountMutations(discount.discountId);

  if (!discountCode) {
    return;
  }

  if (isLoading || isDeactivating) {
    return (
      <Column centerH>
        <CircularProgress size={25} />
        {isDeactivating
          ? discountCode.isDeactivated
            ? "Activating..."
            : "Deactivating..."
          : "Loading..."}
      </Column>
    );
  }

  return (
    <ActionMenu>
      <MenuButtonItem iconName="trash" label="Delete" disable />
      <MenuButtonItem
        iconName="turn_off"
        label={!!discountCode.isDeactivated ? "Activate" : "Deactivate"}
        onClick={() => {
          toggleActivation({ isDeactivated: !discount.isDeactivated });
        }}
      />
      <MenuButtonItem iconName="edit" label="Edit" />
    </ActionMenu>
  );
}
