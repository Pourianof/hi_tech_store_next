import { useEffect, useRef } from "react";

let modalIdTracker = 0;

export function useBackBtnHandler({ onBack }: { onBack: VoidFunction }) {
  const backId = useRef(modalIdTracker++);
  useEffect(() => {
    const id = backId.current;
    window.history.pushState({ id }, "");
    const handlePopState = (e: PopStateEvent) => {
      if (e.state.id == id) {
        onBack();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onBack]);
}
