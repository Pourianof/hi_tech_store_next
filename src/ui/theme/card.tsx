import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function Card({
  children,
  scaleTransition,
  className,
  noShadow,
  variant,
  noHoverReaction,
  border,
}: {
  children: ReactNode;
  scaleTransition?: boolean;
  className?: string;
  noShadow?: boolean;
  variant?: "large" | "small";
  noHoverReaction?: boolean;
  border?: boolean;
}) {
  const spacingStyles =
    variant == "small" ? "p-8px rounded-sm" : "p-16px rounded-md";

  return (
    <div
      className={twMerge(
        "transition bg-white",
        !noShadow ? `shadow-1 ${noHoverReaction ? "" : "hover:shadow-2"}` : "",
        spacingStyles,
        border ? "border border-gray-neutral-ed" : "",
        scaleTransition ? "hover:scale-105" : "",
        className ?? "",
      )}
    >
      {children}
    </div>
  );
}
