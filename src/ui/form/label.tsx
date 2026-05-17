import { ReactNode } from "react";

export function Label({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="text-stone-600 text-sm">
      {children}
    </label>
  );
}
