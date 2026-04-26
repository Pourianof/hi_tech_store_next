import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = { className?: string; children: ReactNode; size: "sm" | "lg" };

export function Overline({ children, className, size }: Props) {
  return (
    <span
      className={twMerge(
        "text-overline-mobile ",
        size == "sm" ? "desktop:text-overline-sm" : "desktop:text-overline-lg",
        className,
      )}
    >
      {children}
    </span>
  );
}
