"use client";

import dynamic from "next/dynamic";
import { createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

const ICONS = {
  search: dynamic(() => import("@/assets/tech_heim/search.svg")),
  order_basket: dynamic(() => import("@/assets/tech_heim/empty_cart.svg")),
  user: dynamic(() => import("@/assets/tech_heim/user.svg")),
  user_edit: dynamic(() => import("@/assets/tech_heim/user-edit.svg")),
  profile: dynamic(() => import("@/assets/tech_heim/profile-circle.svg")),
  dollar: dynamic(() => import("@/assets/tech_heim/dollar-circle.svg")),
  heart_outline: dynamic(() => import("@/assets/tech_heim/heart_outline.svg")),
  gift: dynamic(() => import("@/assets/tech_heim/gift.svg")),
  security: dynamic(() => import("@/assets/tech_heim/security-safe.svg")),
  bell: dynamic(() => import("@/assets/tech_heim/notification.svg")),
  support24: dynamic(() => import("@/assets/tech_heim/24-support.svg")),
  exit: dynamic(() => import("@/assets/tech_heim/logout.svg")),
  edit: dynamic(() => import("@/assets/tech_heim/edit.svg")),
  phone: dynamic(() => import("@/assets/tech_heim/call.svg")),
  email: dynamic(() => import("@/assets/tech_heim/direct.svg")),
  key: dynamic(() => import("@/assets/tech_heim/key.svg")),
  home: dynamic(() => import("@/assets/tech_heim/home-2.svg")),
  postal: dynamic(() => import("@/assets/tech_heim/postal.svg")),
  visa: dynamic(() => import("@/assets/tech_heim/visa.svg")),
  master_card: dynamic(() => import("@/assets/tech_heim/master card.svg")),
  american_express: dynamic(
    () => import("@/assets/tech_heim/american express.svg"),
  ),
  paypal: dynamic(() => import("@/assets/tech_heim/paypal.svg")),
  arrow_right: dynamic(() => import("@/assets/tech_heim/arrow-right.svg")),
  message_question: dynamic(
    () => import("@/assets/tech_heim/message-question.svg"),
  ),
  copyright: dynamic(() => import("@/assets/tech_heim/copyright.svg")),
  right_arrow_circular: dynamic(
    () => import("@/assets/tech_heim/right_arrow.svg"),
  ),
  left_arrow: dynamic(() => import("@/assets/tech_heim/left_arrow.svg")),
  filled_star: dynamic(() => import("@/assets/tech_heim/star_outline.svg")),
  cms: dynamic(() => import("@/assets/tech_heim/cms.svg")),
  product: dynamic(() => import("@/assets/tech_heim/product.svg")),
  category: dynamic(() => import("@/assets/tech_heim/category.svg")),
  trash: dynamic(() => import("@/assets/tech_heim/trash.svg")),
  image: dynamic(() => import("@/assets/tech_heim/image.svg")),
  stock: dynamic(() => import("@/assets/tech_heim/shop.svg")),
  verify: dynamic(() => import("@/assets/tech_heim/verify.svg")),
  guarantee: dynamic(() => import("@/assets/tech_heim/verify.svg")),
  truck: dynamic(() => import("@/assets/tech_heim/truck.svg")),
  discount: dynamic(() => import("@/assets/tech_heim/discount-shape.svg")),
  checklist: dynamic(() => import("@/assets/tech_heim/checklist.svg")),
  component: dynamic(() => import("@/assets/tech_heim/component.svg")),
  close: dynamic(() => import("@/assets/tech_heim/close.svg")),
  filter: dynamic(() => import("@/assets/tech_heim/filter.svg")),
  back: dynamic(() => import("@/assets/tech_heim/back.svg")),
  menu: dynamic(() => import("@/assets/tech_heim/menu.svg")),
  circular_close: dynamic(() => import("@/assets/tech_heim/close-circle.svg")),
  arrow_forward: dynamic(() => import("@/assets/tech_heim/arrow-forward.svg")),
  add: dynamic(() => import("@/assets/tech_heim/add-outline.svg")),
  remove: dynamic(() => import("@/assets/tech_heim/remove-outline.svg")),
  cart: dynamic(() => import("@/assets/tech_heim/cart-outline.svg")),
  card: dynamic(() => import("@/assets/tech_heim/card.svg")),
  circular_left_arrow: dynamic(
    () => import("@/assets/tech_heim/arrow-left.svg"),
  ),
  dotten_menu: dynamic(
    () => import("@/assets/tech_heim/ellipsis-vertical.svg"),
  ),
  turn_off: dynamic(() => import("@/assets/tech_heim/power.svg")),
  eye: dynamic(() => import("@/assets/tech_heim/eye.svg")),
  video_play: dynamic(() => import("@/assets/tech_heim/video_play.svg")),
  info_circle: dynamic(() => import("@/assets/tech_heim/info.svg")),
  camera: dynamic(() => import("@/assets/tech_heim/camera.svg")),
  loading: dynamic(() => import("@/assets/tech_heim/loading.svg")),
  arrow: dynamic(() => import("@/assets/tech_heim/arrow.svg")),
  video: dynamic(() => import("@/assets/tech_heim/video.svg")),
  play: dynamic(() => import("@/assets/tech_heim/play.svg")),
  facebook: dynamic(() => import("@/../public/icons/socials/Facebook.svg")),
  instagram: dynamic(() => import("@/../public/icons/socials/Instagram.svg")),
  twitter: dynamic(() => import("@/../public/icons/socials/Twitter.svg")),
  youtube: dynamic(() => import("@/../public/icons/socials/Youtube.svg")),
} as const;

export type IconNames = keyof typeof ICONS;

export default function Icon(props: { className?: string; name: IconNames }) {
  const iconTheme = useIconTheme();
  const IconComponent = ICONS[props.name];

  return (
    <i
      style={{ fontSize: iconTheme.size ? `${iconTheme.size}px` : undefined }}
      className={twMerge(
        "icon",
        iconTheme.className ?? "",
        "not-italic align-middle inline-block",
        props.className ?? "",
      )}
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
