"use client";
import { createContext, ReactNode, useContext } from "react";
import { NoContextDefinedError } from "../errors/NoContextDefinedError";

interface StaticDataMap {
  [key: string]: unknown;
}

const StaticDataContext = createContext<StaticDataMap>({});

type Props = {
  children: ReactNode;
  data: unknown;
  dataKey: string;
};

export function useStaticData(key: string) {
  const context = useContext(StaticDataContext);

  if (!context) {
    throw new NoContextDefinedError("StaticDataContext");
  }

  return context[key];
}

export function StaticDataInjector({ children, data, dataKey }: Props) {
  return (
    <StaticDataContext.Provider
      value={{
        [dataKey]: data,
      }}
    >
      {children}
    </StaticDataContext.Provider>
  );
}
