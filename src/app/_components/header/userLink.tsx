"use client";
import { useAuth } from "@/ui/contexts/authContext";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";
import { Caption } from "@/ui/theme/text/caption";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

export function UserLink() {
  const { data: session, isLoading } = useAuth();

  if (isLoading) {
    return <CircularProgress size={15} />;
  }

  return (
    <Link
      className="flex gap-1"
      href={{ pathname: session ? "/account" : "/login" }}
    >
      {session?.user.avatarUrl ? (
        <div className="w-[28px] h-[28px] rounded-full border border-gray-400 p-[1px]">
          <ApiImage
            alt="user avatar"
            src={session.user.avatarUrl}
            className="w-full h-full object-cover rounded-full overflow-clip"
          />
        </div>
      ) : (
        <Icon name="user" />
      )}
      {!!session && (
        <Column
          center
          className="text-sm bg-gray-300 p-1 px-1.5 rounded hover:bg-gray-400 self-center"
        >
          <Caption size="md">{session.user?.firstName}</Caption>
        </Column>
      )}
    </Link>
  );
}
