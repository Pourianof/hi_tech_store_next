"use client";
import { useRouter } from "next/navigation";
import { Modal } from "@/ui/modal/modal";
import { ReactNode, useEffect } from "react";
import Icon from "@/ui/icons/icon";
import { useIsDesktopScreen } from "@/ui/theme/helpers/isDesktopMode";

export function FilterPage({ children }: { children: ReactNode }) {
  const isDesktop = useIsDesktopScreen();
  const router = useRouter();

  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = "auto";
    };
  }, []);

  if (isDesktop) {
    router.push("/products");
    return null;
  }

  return (
    <Modal variants="full-page" onClose={() => {}}>
      <div className="flex flex-col">
        <div className="pb-2 border-b mb-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="cursor-pointer space-x-1"
          >
            <Icon name="back" />
            <span className="font-medium">Back</span>
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
}
