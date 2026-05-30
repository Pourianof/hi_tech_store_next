import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function Wrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "max-w-[min(100%, 1440px)] xl:w-[80%] md:w-[90%] w-[90%]  mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
