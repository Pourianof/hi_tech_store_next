"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function DisplayOn({
  children,
  root,
}: {
  children: ReactNode;
  root?: boolean;
}) {
  const pathName = usePathname();

  if (root && pathName.endsWith("account")) {
    return children;
  } else if (!root && !pathName.endsWith("account")) {
    return children;
  }

  return null;
}
