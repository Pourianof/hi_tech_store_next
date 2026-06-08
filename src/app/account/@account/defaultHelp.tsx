"use client";
import { useIsDesktopScreen } from "@/ui/theme/helpers/isDesktopMode";
import { ReactNode } from "react";

export function DefaultHelp({ children }: { children: ReactNode }) {
  const isDektop = useIsDesktopScreen();

  if (isDektop) {
    return children;
  }

  return null;
}
