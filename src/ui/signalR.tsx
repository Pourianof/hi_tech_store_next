"use client";
import { authStore } from "@/lib/auth/authStore";
import { ensureStarted, getConnection } from "@/lib/signalRConnection";
import { HubConnection } from "@microsoft/signalr";
import { createContext, ReactNode, useContext, useEffect } from "react";

const Context = createContext<{ connection: HubConnection }>(
  null as unknown as { connection: HubConnection },
);

export function SignalRProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const sub = authStore.onToken(() => {
      ensureStarted();
      sub.cancel();
    });
  }, []);

  return (
    <Context.Provider
      value={{
        connection: getConnection(),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useSignalR = () => useContext(Context);
