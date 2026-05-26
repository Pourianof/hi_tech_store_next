"use client";

import { useRouter } from "next/navigation";

interface RedirectorProps {
  timeout: number;
  push?: boolean;
  destinationPath?: string;
}

export function useDelayedRedirect({
  timeout = 1000,
  push,
  destinationPath,
}: RedirectorProps) {
  const router = useRouter();

  return () =>
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

export function useRedirect(props: RedirectorProps) {
  useDelayedRedirect(props)();
}

export function Redirector(props: RedirectorProps) {
  useRedirect(props);
  return null;
}
