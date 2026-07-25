"use client";
/**
 * A container box which fill the total width of screen
 * good for mobile ui
 */

import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useIsDesktopScreen } from "./theme/helpers/isDesktopMode";

export function FillerBox({ children }: { children: ReactNode }) {
  const isDesktopMode = useIsDesktopScreen();
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateWidth = useCallback(
    function calculateWidth() {
      if (!containerRef.current || isDesktopMode) {
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
    },
    [isDesktopMode],
  );

  useEffect(() => {
    function handleResize() {
      calculateWidth();
    }

    // this is for when initial parent height calculation get wrong because of unstable rendering
    // for example some css get delayed and layout is different than we expect after css applied
    function safeCalculateOnInitialRender() {
      setTimeout(() => {
        calculateWidth();
      }, 10000);
    }

    const id = setTimeout(safeCalculateOnInitialRender, 500);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(id);
    };
  }, [calculateWidth]);

  useLayoutEffect(() => {
    calculateWidth();
  }, [calculateWidth]);

  useEffect(() => {
    if (!isDesktopMode || !containerRef.current) {
      return;
    }

    containerRef.current.style.width = "auto";
    containerRef.current.parentElement!.style.height = "auto";
  }, [isDesktopMode]);

  return (
    <div className="relative w-full">
      <div ref={containerRef} className="absolute desktop:static top-0 left-0">
        {children}
      </div>
    </div>
  );
}
