"use client";
import { ReactNode, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({
  children,
  onClose,
  className,
  variants = "center",
  diableScroll = true,
  containerClassName,
}: {
  children: ReactNode;
  onClose?: VoidFunction;
  className?: string;
  variants?: "full-page" | "center" | "standard" | "raw";
  diableScroll?: boolean;
  containerClassName?: string;
}) {
  useLayoutEffect(() => {
    if (diableScroll) {
      window.document.body.style.overflow = "hidden";
      return () => {
        window.document.body.style.overflow = "auto";
      };
    }
  }, [diableScroll]);

  let overlayClassName;
  let _containerClassName = "";

  switch (variants) {
    case "center":
      overlayClassName = "items-center justify-center";
      _containerClassName = "rounded-2xl max-w-sm w-full shadow-xl";
      break;
    case "full-page":
      overlayClassName = "items-stretch";
      _containerClassName = "w-full";
      break;

    case "standard":
      overlayClassName = "items-center";
      _containerClassName = "rounded-2xl max-w-sm w-full shadow-xl";
      break;
    case "raw":
      _containerClassName = "";
  }
  return createPortal(
    <div
      className={
        "fixed inset-0 bg-black/50 flex z-50 " +
        overlayClassName +
        " " +
        (className ?? "")
      }
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-10"
        onClick={(e) => {
          e.preventDefault();
          onClose?.();
        }}
      ></div>
      <div
        className={
          "bg-white p-6 z-20 " +
          _containerClassName +
          " " +
          (containerClassName ?? "")
        }
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
