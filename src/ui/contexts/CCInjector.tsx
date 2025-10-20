/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { NoContextDefinedError } from "../errors/NoContextDefinedError";

export interface IInjectorContext<T = any> {
  data: T;
  dataKey: string;
  dataFetcher: () => Promise<any>;
  mutator: ReturnType<typeof useState>[1];
}

const InjectorContext = createContext<IInjectorContext[]>([]);

export function useInjectedData(dataKey: string): IInjectorContext | undefined {
  const context = useContext(InjectorContext) as IInjectorContext[] | undefined;

  if (!context) {
    throw new NoContextDefinedError("Injector");
  }

  return context.find((ctx) => ctx.dataKey == dataKey);
}

// Create a centeral place for sharing same data to multi consumers
export function CCInjector({
  children,
  ...ctx
}: Omit<IInjectorContext, "mutator"> & {
  children: ReactNode;
}) {
  const upperContext = useContext(InjectorContext) ?? [];
  const [contextState, setContextState] = useState(ctx.data);

  const newContext = [...upperContext];

  newContext.push({
    data: contextState,
    dataFetcher: ctx.dataFetcher,
    dataKey: ctx.dataKey,
    mutator: setContextState as any,
  });

  return (
    <InjectorContext.Provider value={newContext}>
      {children}
    </InjectorContext.Provider>
  );
}
