import { ReactNode } from "react";

export function Wrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-[min(100%, 1440px)] xl:w-[80%] md:w-[90%] w-[90%]  mx-auto ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
