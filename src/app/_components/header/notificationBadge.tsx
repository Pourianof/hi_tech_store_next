"use client";
import { getNotificationsAction } from "@/lib/server_actions/notificationActions";
import { usePagedQuery } from "@/ui/contexts/pagedQuery";
import Icon from "@/ui/icons/icon";
import { Badge, CircularProgress } from "@mui/material";

export function NotificationBadge() {
  const { isLoading, notifications } = useNotifications();

  return (
    <Badge
      badgeContent={
        isLoading ? <CircularProgress size={10} /> : notifications?.totalCount
      }
      anchorOrigin={{
        vertical: "bottom",
      }}
      max={99}
      color="primary"
      variant={isLoading ? "dot" : "standard"}
      invisible={isLoading}
      sx={{
        "& .MuiBadge-badge": {
          minWidth: "15px",
          width: "15px",
          height: "15px",
          fontSize: "10px",
        },
      }}
    >
      <Icon name="notification" />
    </Badge>
  );
}

function useNotifications() {
  const {
    query: { data: notifications, isLoading },
  } = usePagedQuery(
    () =>
      getNotificationsAction({
        excludes: ["PermissionChanged"],
      }),
    "user-notifs",
  );

  return { notifications, isLoading };
}
