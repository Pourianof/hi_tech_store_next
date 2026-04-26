import { ReactNode } from "react";
import { ClassNamesBySizes, Sizes } from "../helpers/size";

const captionStyle: ClassNamesBySizes = {
  xl: "text-caption-mobile desktop:text-caption-lg",
  lg: "text-caption-mobile desktop:text-caption-lg",
  md: "text-caption-mobile desktop:text-caption-md",
  sm: "text-caption-mobile desktop:text-caption-sm",
  xs: "text-caption-mobile desktop:text-caption-sm",
};

export function Caption({
  children,
  size,
}: {
  children: ReactNode;
  size: Sizes;
}) {
  return <div className={captionStyle[size]}>{children}</div>;
}
