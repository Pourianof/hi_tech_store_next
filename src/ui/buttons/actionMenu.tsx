"use client";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Icon, { IconNames } from "../icons/icon";
import { Row } from "../layouts/row";
import { ReactNode, useState } from "react";
import Link from "next/link";

export function ActionMenu({ children }: { children: ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        {children}
      </Menu>
    </>
  );
}

export function MenuButtonItem({
  label,
  disable,
  ...props
}: (
  | {
      iconName: IconNames;
    }
  | { icon: ReactNode }
) &
  (
    | {
        onClick?: VoidFunction;
      }
    | { link: string }
  ) & {
    label: string;
    disable?: boolean;
  }) {
  const content = (
    <Row className="gap-1" centerV>
      {"iconName" in props ? <Icon name={props.iconName} /> : props.icon}
      <span>{label}</span>
    </Row>
  );

  return (
    <MenuItem
      disabled={disable}
      onClick={"onClick" in props ? props.onClick : undefined}
    >
      {"link" in props ? <Link href={props.link}>{content}</Link> : content}
    </MenuItem>
  );
}
