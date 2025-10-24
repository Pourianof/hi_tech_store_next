import { ReactNode } from "react";
import { createPortal } from "react-dom";

export function Modal({
  children,
  onClose,
  className,
  variants = "center",
}: {
  children: ReactNode;
  onClose?: VoidFunction;
  className?: string;
  variants?: "full-page" | "center" | "standard";
}) {
  let overlayClassName;
  let containerClassName = "";

  switch (variants) {
    case "center":
      overlayClassName = "items-center justify-center";
      containerClassName = "rounded-2xl max-w-sm w-full shadow-xl";
      break;
    case "full-page":
      overlayClassName = "items-stretch";
      containerClassName = "w-full";
      break;

    case "standard":
      overlayClassName = "items-center";
      containerClassName = "rounded-2xl max-w-sm w-full shadow-xl";
      break;
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
      <div className={"bg-white p-6 z-20 " + containerClassName}>
        {children}
      </div>
    </div>,
    document.body
  );
}
