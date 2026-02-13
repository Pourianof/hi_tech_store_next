import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  center?: boolean;
};

export function Column({ children, className, ...props }: Props) {
  const isCenter = "center" in props && props.center != false;

  return (
    <div
      className={[
        "flex flex-col",
        className ?? "",
        isCenter ? "justify-center" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
