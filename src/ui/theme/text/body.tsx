import { ReactNode } from "react";
import { ClassNamesBySizes, Sizes } from "../helpers/size";

const bodyStyle: ClassNamesBySizes = {
  xl: "text-body-xl font-light",
  lg: "text-body-lg font-light",
  md: "text-body-md font-light",
  sm: "text-body-sm font-light",
  xs: "text-body-xs font-light",
};

type Props = { children: ReactNode; size: Sizes; className?: string };

export function Body({ children, size, className }: Props) {
  return (
    <div className={[bodyStyle[size], className ?? ""].join(" ")}>
      {children}
    </div>
  );
}
