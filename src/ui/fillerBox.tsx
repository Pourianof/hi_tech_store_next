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

    const { left } = containerRef.current.getBoundingClientRect();

    // this strategy work better instead of using 100dvw because
    // 100dvw include the scroll bar width which cause some y-basis
    // overflow
    containerRef.current.style.width = `calc(${
      window.document.body.getBoundingClientRect().width
    }px - ${left}px)`;
  }, []);

  return (
    <div ref={containerRef} className="w-dvw">
      {children}
    </div>
  );
}
