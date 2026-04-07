import { ReactNode } from "react";

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-semibold text-2xl my-2">{children}</h3>;
}

export function H4({ children }: { children: ReactNode }) {
  return <h4 className="text-xl mb-4 font-semibold">{children}</h4>;
}
