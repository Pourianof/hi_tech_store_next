"use client";
import Icon from "@/ui/icons/icon";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function UserLink() {
  const { data: session } = useSession();
  return (
    <Link
      className="flex gap-1"
      href={{ pathname: session ? "/account" : "/login" }}
    >
      <Icon name="user" />
      {!!session && (
        <span className="text-sm bg-gray-300 inline-block px-1 rounded hover:bg-gray-400">
          {session.user?.firstName}
        </span>
      )}
    </Link>
  );
}
