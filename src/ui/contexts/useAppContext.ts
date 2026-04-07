import { Context, useContext } from "react";

export function useAppContext<T>(context: Context<T>) {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error(
      `No ${context.displayName ?? context.name} defined in upper components`,
    );
  }

  return ctx;
}
