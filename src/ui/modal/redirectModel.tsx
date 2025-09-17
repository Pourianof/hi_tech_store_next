"use client";
import { ReactNode } from "react";
import { Modal } from "./modal";
import { useRouter } from "next/navigation";

export function RedirectModal({
  children,
  destination,
}: {
  destination: string;
  children: ReactNode;
}) {
  const router = useRouter();

  function redirect() {
    const url = new URL(window.location.href);
    url.pathname = destination;
    router.replace(url.href);
  }
  return <Modal onClose={redirect}>{children}</Modal>;
}
