"use client";
import { useRouter } from "next/navigation";
import { createRef, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const modalContentWrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setMounted(true);
    if (modalContentWrapperRef.current) {
      modalContentWrapperRef.current.addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
        },
        {
          capture: true,
        }
      );
    }
  }, [modalContentWrapperRef]);

  if (!mounted) return null; // صبر می‌کنیم تا کلاینت mount بشه
  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      <div
        ref={modalContentWrapperRef}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
