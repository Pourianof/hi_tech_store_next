import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function ButtonLabel({
  children,
  size,
}: {
  children: ReactNode;
  size?: "lg" | "sm";
}) {
  return (
    <span
      className={twMerge(size == "sm" ? "text-button-sm" : "text-button-lg")}
    >
      {children}
    </span>
  );
}
