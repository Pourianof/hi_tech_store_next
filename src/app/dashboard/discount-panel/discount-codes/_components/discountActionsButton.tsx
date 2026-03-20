"use client";
import { DiscountCode } from "@/core/models/discount";
import Icon, { IconNames } from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDiscountMutations } from "./hooks/useDiscountMutations";
import { Row } from "@/ui/layouts/row";

type Props = {
  discount: DiscountCode;
};

export function DiscountActionsButton({ discount }: Props) {
  const { discountCode, isDeactivating, isLoading, toggleActivation } =
    useDiscountMutations(discount.discountCodeId);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <>
      <IconButton onClick={handleClick}>
        <Icon name="dotten_menu" />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuButtonItem iconName="trash" label="Delete" disable />
        <MenuButtonItem
          iconName="turn_off"
          label={!!discountCode.isDeactivated ? "Activate" : "Deactivate"}
          onClick={() => {
            toggleActivation({ isDeactivated: !discount.isDeactivated });
            handleClose();
          }}
        />
        <MenuButtonItem iconName="edit" label="Edit" />
      </Menu>
    </>
  );
}

function MenuButtonItem({
  iconName,
  label,
  disable,
  onClick,
}: {
  iconName: IconNames;
  label: string;
  disable?: boolean;
  onClick?: VoidFunction;
}) {
  return (
    <MenuItem disabled={disable} onClick={onClick}>
      <Row className="gap-1" centerV>
        <Icon name={iconName} />
        <span>{label}</span>
      </Row>
    </MenuItem>
  );
}
