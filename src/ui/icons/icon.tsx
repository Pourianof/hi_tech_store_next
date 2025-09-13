"use client";
import SearchIcon from "@/assets/tech_heim/search.svg";
import OrderBasketIcon from "@/assets/tech_heim/empty_cart.svg";
import UserIcon from "@/assets/tech_heim/user.svg";
import UserEditIcon from "@/assets/tech_heim/user-edit.svg";
import Profile from "@/assets/tech_heim/profile-circle.svg";
import Dollor from "@/assets/tech_heim/dollar-circle.svg";
import HeartOutline from "@/assets/tech_heim/heart_outline.svg";
import Gift from "@/assets/tech_heim/gift.svg";
import Security from "@/assets/tech_heim/security-safe.svg";
import Bell from "@/assets/tech_heim/notification.svg";
import Support24 from "@/assets/tech_heim/24-support.svg";
import Exit from "@/assets/tech_heim/logout.svg";
import Edit from "@/assets/tech_heim/edit.svg";
import Phone from "@/assets/tech_heim/call.svg";
import Direct from "@/assets/tech_heim/direct.svg";
import Key from "@/assets/tech_heim/key.svg";
import Home from "@/assets/tech_heim/home-2.svg";
import Postal from "@/assets/tech_heim/postal.svg";
import Visa from "@/assets/tech_heim/visa.svg";
import AmericanExpress from "@/assets/tech_heim/american express.svg";
import MasterCard from "@/assets/tech_heim/master card.svg";
import Paypal from "@/assets/tech_heim/paypal.svg";
import ArrowRight from "@/assets/tech_heim/arrow-right.svg";

import { createContext, useContext } from "react";

const ICONS = {
  search: SearchIcon,
  order_basket: OrderBasketIcon,
  user: UserIcon,
  user_edit: UserEditIcon,
  profile: Profile,
  dollar: Dollor,
  heart_outline: HeartOutline,
  gift: Gift,
  security: Security,
  bell: Bell,
  support24: Support24,
  exit: Exit,
  edit: Edit,
  phone: Phone,
  email: Direct,
  key: Key,
  home: Home,
  postal: Postal,
  visa: Visa,
  master_card: MasterCard,
  american_express: AmericanExpress,
  paypal: Paypal,
  arrow_right: ArrowRight,
};

export type IconNames = keyof typeof ICONS;

export default function Icon(props: { className?: string; name: IconNames }) {
  const iconTheme = useIconTheme();
  const IconComponent = ICONS[props.name];
  return (
    <i
      style={{ fontSize: iconTheme.size ? `${iconTheme.size}px` : undefined }}
      className={`${
        iconTheme.className ?? ""
      } not-italic align-middle inline-block ${props.className ?? ""}`}
    >
      <IconComponent />
    </i>
  );
}

interface IconThemeContextModel {
  size?: number;
  className?: string;
}
const IconThemeContext = createContext<IconThemeContextModel>({});

export function useIconTheme() {
  return useContext(IconThemeContext);
}

export function IconThemeProvider(props: {
  theme: IconThemeContextModel;
  children: React.ReactNode;
}) {
  return (
    <IconThemeContext.Provider value={props.theme}>
      {props.children}
    </IconThemeContext.Provider>
  );
}
