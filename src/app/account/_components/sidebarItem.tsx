"use client";

import Icon, { IconNames } from "@/ui/icons/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarItem({
  iconName,
  title,
  href,
  notPrependHref,
}: {
  title: string;
  iconName: IconNames;
  href: string;
  notPrependHref?: boolean;
}) {
  const pathname = usePathname().toLowerCase();
  const isActivated =
    (pathname == "/account" && href == "/personal-data") ||
    pathname.endsWith(href);
  return (
    <div className={`p-4 ${isActivated ? "border-s-2 border-s-blue-500" : ""}`}>
      <Link
        href={`${!notPrependHref ? "/account" : ""}${href}`}
        className={isActivated ? "text-blue-500" : ""}
      >
        <Icon name={iconName} />
        <span className={iconName == "exit" ? "text-red-600" : ""}>
          {title}
        </span>
      </Link>
    </div>
  );
}
