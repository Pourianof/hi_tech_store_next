"use client";

import Icon, { IconNames } from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
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

  const content = (
    <Row className="gap-16px" centerV>
      <Icon name={iconName} />
      <span className={iconName == "exit" ? "text-red-600" : ""}>{title}</span>
    </Row>
  );
  const actualHref = `${!notPrependHref ? "/account" : ""}${href}`;
  return (
    <div className={`p-4 ${isActivated ? "border-s-2 border-s-blue-500" : ""}`}>
      {notPrependHref ? (
        <a href={actualHref} className={isActivated ? "text-blue-500" : ""}>
          <Body size="xl">{content}</Body>
        </a>
      ) : (
        <Link
          replace={true}
          href={actualHref}
          className={isActivated ? "text-blue-500" : ""}
        >
          <Body size="xl">{content}</Body>
        </Link>
      )}
    </div>
  );
}
