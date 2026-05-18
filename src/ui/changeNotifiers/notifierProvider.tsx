"use client";

import { ChangeNotifier } from "@/lib/changeNotifier/changeNofier";
import { createContext, ReactNode, useContext } from "react";

type ChangeNotifierState = {
  data: ChangeNotifier;
  upperData?: ChangeNotifierState;
};

export type ChangeNotifierConstructor<T extends ChangeNotifier> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
};

const ChangeNotifierContext = createContext<ChangeNotifierState>(
  {} as unknown as ChangeNotifierState,
);

export function useNotifier<T extends ChangeNotifier>(
  type: ChangeNotifierConstructor<T>,
) {
  const context = useContext(ChangeNotifierContext);

  let current: ChangeNotifierState | undefined = context;
  while (current) {
    if (current.data instanceof type) {
      return current.data;
    }

    current = current.upperData;
  }
}

export function NotifierProvider(props: {
  changeNotifier: ChangeNotifier;
  children: ReactNode;
}) {
  const upperData = useContext(ChangeNotifierContext);

  return (
    <ChangeNotifierContext.Provider
      value={{
        data: props.changeNotifier,
        upperData,
      }}
    >
      {props.children}
    </ChangeNotifierContext.Provider>
  );
}
