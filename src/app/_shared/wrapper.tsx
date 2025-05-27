import { ReactNode } from "react";

export function Wrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`wrapper ${className}`}>{children}</div>;
}
