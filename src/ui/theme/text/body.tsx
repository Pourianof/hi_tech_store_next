import React, { HTMLElementType, ReactNode } from "react";
import { ClassNamesBySizes, Sizes } from "../helpers/size";
import { twMerge } from "tailwind-merge";

const bodyStyle: ClassNamesBySizes = {
  xl: "text-body-xl font-light",
  lg: "text-body-lg font-light",
  md: "text-body-md font-light",
  sm: "text-body-sm font-light",
  xs: "text-body-xs font-light",
};

type Props = {
  children: ReactNode;
  size: Sizes;
  className?: string;
  as?: HTMLElementType;
  style?: React.HTMLAttributes<HTMLDivElement>["style"];
};

export function Body({ children, size, className, as, style }: Props) {
  const cn = twMerge(bodyStyle[size], className ?? "");

  return React.createElement(
    as ?? "div",
    {
      className: cn,
      style: {
        display: "inline-block",
        ...style,
      },
    },
    children,
  );
}
