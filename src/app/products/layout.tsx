import { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
