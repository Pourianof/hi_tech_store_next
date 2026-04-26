import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function Card({
  children,
  scaleTransition,
  clasName,
  noShadow,
  variant,
}: {
  children: ReactNode;
  scaleTransition?: boolean;
  clasName?: string;
  noShadow?: boolean;
  variant?: "large" | "small";
}) {
  const spacingStyles =
    variant == "small" ? "p-8px rounded-sm" : "p-16px rounded-md";

  return (
    <div
      className={twMerge(
        "transition bg-white",
        !noShadow ? "shadow-1 hover:shadow-2" : "",
        spacingStyles,
        scaleTransition ? "hover:scale-105" : "",
        clasName ?? "",
      )}
    >
      {children}
    </div>
  );
}
