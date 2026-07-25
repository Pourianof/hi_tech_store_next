"use client";
import { UserNotification } from "@/core/models/notification";
import { authStore } from "@/lib/auth/authStore";
import { SIGNALR_CHANNEL_NAME } from "@/lib/constants";
import { getNotificationsAction } from "@/lib/server_actions/notificationActions";
import { getMyDataAction } from "@/lib/server_actions/userActions";
import { useSignalR } from "@/ui/signalR";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

export function AuthStoreHandler() {
  const { data, update, status } = useSession();
  const { connection } = useSignalR();

  if (data) {
    authStore.setToken(data.apiToken);
  }

  const updateUserData = useCallback(
    function updateUserData() {
      getMyDataAction().then((result) => {
        if (result.status == "success") {
          update({
            user: result.data,
          });
        }
      });
    },
    [update],
  );

  useEffect(() => {
    connection.on(SIGNALR_CHANNEL_NAME, (notif: UserNotification) => {
      const notifTime = new Date(notif.createdAt);
      const lastDataVersionTime = data?.user.dataAt
        ? new Date(data.user.dataAt)
        : null;

      if (
        lastDataVersionTime &&
        lastDataVersionTime.getTime() < notifTime.getTime()
      ) {
        //  update session data state
        updateUserData();
      }
    });

    return () => connection.off(SIGNALR_CHANNEL_NAME);
  }, [connection, data?.user.dataAt, updateUserData]);

  useEffect(() => {
    if (status == "loading" || status == "unauthenticated") {
      return;
    }

    if (!data?.user.dataAt) {
      updateUserData();

      return;
    }

    getNotificationsAction({
      includes: ["PermissionChanged"],
      limit: 1,
      after: new Date(data.user.dataAt),
    }).then((result) => {
      if (result.status == "failed") {
        return;
      }

      if (result.data.totalCount) {
        updateUserData();
      }
    });
  }, [data?.user.dataAt, status, updateUserData]);

  return null;
}
