"use client";
/**
 * A container box which fill the total width of screen
 * good for mobile ui
 */

import { ReactNode, useLayoutEffect, useRef } from "react";

export function FillerBox({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const { left, height } = containerRef.current.getBoundingClientRect();

    // this strategy work better instead of using 100dvw because
    // 100dvw include the scroll bar width which cause some y-basis
    // overflow
    containerRef.current.style.width = `calc(${
      window.document.body.getBoundingClientRect().width
    }px - ${left}px)`;

    containerRef.current.parentElement!.style.height = `${height}px`;
  }, []);

  return (
    <div className="relative w-full">
      <div ref={containerRef} className="absolute top-0 left-0">
        {children}
      </div>
    </div>
  );
}
