"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { useRhfDevTool } from "rhf-devtools";

const RhfDevTools =
  process.env.NODE_ENV == "development"
    ? dynamic(async () => (await import("rhf-devtools")).RhfDevTools, {
        ssr: false,
      })
    : null;

export function RhfDevToolsClient({ children }: { children: ReactNode }) {
  return process.env.NODE_ENV == "development"
    ? RhfDevTools && (
        <RhfDevTools displayOnlyIfAnyFormExists>{children}</RhfDevTools>
      )
    : children;
}

export function useRhfDevToolsSafely(form: UseFormReturn, name?: string) {
  useRhfDevTool(form, name, { disable: process.env.NODE_ENV != "development" });
}
