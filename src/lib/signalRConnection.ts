import * as signalR from "@microsoft/signalr";
import { authStore } from "./auth/authStore";

let connection: signalR.HubConnection | null = null;
let startPromise: Promise<void> | null = null;

export function getConnection() {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/notifications`, {
        accessTokenFactory: () => authStore.getToken(),
      })
      .withAutomaticReconnect()
      .build();
  }

  return connection;
}

export async function ensureStarted() {
  const connection = getConnection();

  if (connection.state === signalR.HubConnectionState.Connected) {
    return connection;
  }

  if (startPromise) {
    await startPromise;
    return connection;
  }

  startPromise = connection.start();

  try {
    await startPromise;
  } finally {
    startPromise = null;
  }

  return connection;
}
