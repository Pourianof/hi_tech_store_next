import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
};

export function Column({
  children,
  className,
  centerH,
  centerV,
  center,
}: Props) {
  return (
    <div
      className={[
        "flex flex-col",
        className ?? "",
        centerH || center ? "items-center" : "",
        centerV || center ? "justify-center" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
