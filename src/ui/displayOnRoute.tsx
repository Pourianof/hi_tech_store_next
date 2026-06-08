"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function DisplayOnRoute({
  children,
  root,
  endsWith,
}: {
  children: ReactNode;
  root?: boolean;
  endsWith: string;
}) {
  const pathName = usePathname();

  if (root && pathName.endsWith(endsWith)) {
    return children;
  } else if (!root && !pathName.endsWith(endsWith)) {
    return children;
  }

  return null;
}
