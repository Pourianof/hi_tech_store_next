import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export function H1({ children, className }: Props) {
  return (
    <h1 className={["text-h1-mobile desktop:text-h1", className].join(" ")}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: Props) {
  return (
    <h2 className={["text-h2-mobile desktop:text-h2", className].join(" ")}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: Props) {
  return (
    <h3 className={["text-h3-mobile desktop:text-h3", className].join(" ")}>
      {children}
    </h3>
  );
}

export function H4({ children, className }: Props) {
  return (
    <h4 className={["text-h4-mobile desktop:text-h4", className].join(" ")}>
      {children}
    </h4>
  );
}

export function H5({ children, className }: Props) {
  return (
    <h5 className={["text-h4-mobile desktop:text-h5", className].join(" ")}>
      {children}
    </h5>
  );
}

export function H6({ children, className }: Props) {
  return (
    <h6 className={["text-h4-mobile desktop:text-h6", className].join(" ")}>
      {children}
    </h6>
  );
}
