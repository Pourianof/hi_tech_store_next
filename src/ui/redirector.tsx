"use client";

import { useRouter } from "next/navigation";

interface RedirectorProps {
  timeout: number;
  push?: boolean;
  destinationPath?: string;
}

export function useRedirect({
  timeout = 1000,
  push,
  destinationPath,
}: RedirectorProps) {
  const router = useRouter();

  setTimeout(() => {
    if (!destinationPath) {
      router.back();
      return;
    }

    if (push) {
      router.push(destinationPath);
    } else {
      router.replace(destinationPath);
    }
  }, timeout);
}

export function Redirector(props: RedirectorProps) {
  useRedirect(props);
  return null;
}
