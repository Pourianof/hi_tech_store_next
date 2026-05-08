"use client";

import { ReactNode } from "react";
import { RhfDevTools } from "rhf-devtools";

export function RhfDevToolsClient({ children }: { children: ReactNode }) {
  return <RhfDevTools>{children}</RhfDevTools>;
}
