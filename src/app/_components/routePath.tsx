"use client";

import Icon from "@/ui/icons/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function RoutePath() {
  const path = usePathname();

  const pathParts = path.split("/");
  if (path == "/") {
    return null;
  }

  return (
    <div className="my-4 text-gray-neutral-71">
      {pathParts.map((p, i, arr) => {
        const isHome = p == "";
        const isNotLast = i < arr.length - 1;
        return (
          <React.Fragment key={p}>
            <Link
              href={{ pathname: isHome ? "/" : arr.slice(0, i + 1).join("/") }}
              className={`${
                !isNotLast ? "underline text-primary-blue-300" : ""
              } capitalize`}
            >
              {isHome ? "Home" : p}
            </Link>
            {isNotLast && (
              <span>
                <Icon name="arrow_right" className="fill-gray-neutral-71" />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
