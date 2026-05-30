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
    variant == "small" ? "p-2 rounded-sm" : "p-4 rounded-md";

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
