"use client";
import Icon from "@/ui/icons/icon";
import { ReactNode, useLayoutEffect, useState } from "react";

export function ExpandableBox({
  children,
  title,
  className,
  titleClassName,
  isOpen = true,
}: {
  children: ReactNode;
  title: string | ReactNode;
  isOpen?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  const [_isOpen, setIsOpen] = useState(isOpen);

  useLayoutEffect(() => {});

  return (
    <div className={className ?? ""}>
      <div className={`flex justify-between ${titleClassName ?? ""}`}>
        <h4 className="cursor-default">{title}</h4>
        <span
          onClick={(e) => {
            e.preventDefault();
            setIsOpen((io) => !io);
          }}
        >
          <Icon
            name="arrow_right"
            className={`${_isOpen ? "-rotate-90" : "rotate-90"} cursor-pointer`}
          />
        </span>
      </div>
      <div className={`${_isOpen ? "h-auto" : "h-0 overflow-hidden"}`}>
        {children}
      </div>
    </div>
  );
}
