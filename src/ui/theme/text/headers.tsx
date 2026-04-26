import { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="text-h1-mobile desktop:text-h1">{children}</h1>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-h2-mobile desktop:text-h2">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-h3-mobile desktop:text-h3">{children}</h3>;
}

export function H4({ children }: { children: ReactNode }) {
  return <h4 className="text-h4-mobile desktop:text-h4">{children}</h4>;
}

export function H5({ children }: { children: ReactNode }) {
  return <h5 className="text-h4-mobile desktop:text-h5">{children}</h5>;
}

export function H6({ children }: { children: ReactNode }) {
  return <h6 className="text-h4-mobile desktop:text-h6">{children}</h6>;
}
