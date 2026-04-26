import { ReactNode } from "react";

export function Display1({ children }: { children: ReactNode }) {
  return <div className="text-display1 font-semibold">{children}</div>;
}

export function Display2({ children }: { children: ReactNode }) {
  return <div className="text-display2 font-semibold">{children}</div>;
}
