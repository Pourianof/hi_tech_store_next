import { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";

export default function ProductLayout({
  children,
  filters,
}: {
  children: ReactNode;
  filters: ReactNode;
}) {
  return (
    <Wrapper>
      {filters}
      {children}
    </Wrapper>
  );
}
