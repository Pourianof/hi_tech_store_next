"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const RhfDevTools =
  process.env.NODE_ENV == "development"
    ? dynamic(async () => (await import("rhf-devtools")).RhfDevTools, {
        ssr: false,
      })
    : null;

export function RhfDevToolsClient({ children }: { children: ReactNode }) {
  return (
    process.env.NODE_ENV &&
    RhfDevTools && (
      <RhfDevTools displayOnlyIfAnyFormExists>{children}</RhfDevTools>
    )
  );
}
