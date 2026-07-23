"use client";

import { isAdmin, isManager } from "@/lib/helpers/roleHelpers";
import Icon from "@/ui/icons/icon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardLinkButton() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (
    (!(
      isManager(session?.user.roles ?? []) || isAdmin(session?.user.roles ?? [])
    ) &&
      !session?.user.permissions?.length) ||
    pathname.toLowerCase().includes("dashboard")
  ) {
    return null;
  }

  return (
    <Link
      href="/dashboard"
      className="fixed cursor-pointer bg-gray-100 right-4 bottom-4 p-4 hover:shadow-xs shadow-lg shadow-black/30 rounded-full"
    >
      <Icon name="cms" className="text-4xl fill-[#323e81]" />
    </Link>
  );
}
