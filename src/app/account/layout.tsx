import React, { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";

export default function AccountPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
