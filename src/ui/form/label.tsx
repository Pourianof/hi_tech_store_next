import { ReactNode } from "react";

export function Label({ children }: { children: ReactNode }) {
  return <label className="text-stone-600 text-sm">{children}</label>;
}
