"use client";

import Icon, { IconNames } from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

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
    <Row centerV className="justify-between">
      <Row className="gap-16px" centerV>
        <Body size="xl">
          <Icon name={iconName} />
        </Body>
        <Body size="xl" className={iconName == "exit" ? "text-red-600" : ""}>
          {title}
        </Body>
      </Row>
      <Icon
        name="arrow"
        className="rotate-180 text-gray-neutral-b4 desktop:hidden"
      />
    </Row>
  );

  const actualHref = `${!notPrependHref ? "/account" : ""}${href}`;
  return (
    <div
      className={`p-4 border-b border-gray-neutral-ed ${isActivated ? "desktop:border-s-2 desktop:border-s-blue-500" : ""}`}
    >
      {notPrependHref ? (
        <a
          href={actualHref}
          className={isActivated ? "desktop:text-blue-500" : ""}
        >
          {content}
        </a>
      ) : (
        <Link
          replace={true}
          href={actualHref}
          className={twMerge(
            "w-full",
            isActivated ? "desktop:text-blue-500" : "",
          )}
        >
          {content}
        </Link>
      )}
    </div>
  );
}
