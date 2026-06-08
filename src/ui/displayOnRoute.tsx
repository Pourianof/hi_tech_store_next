"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useIsDesktopScreen } from "./theme/helpers/isDesktopMode";

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
  const isDesktop = useIsDesktopScreen();

  if (isDesktop) {
    return children;
  }

  if (root && pathName.endsWith(endsWith)) {
    return children;
  } else if (!root && !pathName.endsWith(endsWith)) {
    return children;
  }

  return null;
}
