import { useEffect } from "react";

export function useBackBtnHandler({ onBack }: { onBack: VoidFunction }) {
  useEffect(() => {
    window.history.pushState({ modalOpen: true }, "");

    const handlePopState = () => {
      onBack();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onBack]);
}
