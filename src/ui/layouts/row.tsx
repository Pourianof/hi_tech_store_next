import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  center?: boolean;
  className?: string;
};
export function Row({ children, className, center, ...props }: Props) {
  return (
    <div
      className={[
        "flex gap-1",
        center ? "items-center" : "",
        className ?? "",
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
