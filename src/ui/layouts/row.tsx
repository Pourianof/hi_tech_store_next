import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
};

export function Row({ children, className, centerH, centerV, center }: Props) {
  return (
    <div
      className={[
        "flex",
        className ?? "gap-1",
        centerV || center ? "items-center" : "",
        centerH || center ? "justify-center" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
