import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export function Row({ children, className, ...props }: Props) {
  return (
    <div className={"flex items-center gap-1 " + (className ?? "")} {...props}>
      {children}
    </div>
  );
}
