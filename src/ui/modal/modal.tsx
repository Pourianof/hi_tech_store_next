import { ReactNode } from "react";
import { createPortal } from "react-dom";

export function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: VoidFunction;
}) {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-10"
        onClick={(e) => {
          e.preventDefault();
          onClose?.();
        }}
      ></div>
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm z-20">
        {children}
      </div>
    </div>,
    document.body
  );
}
