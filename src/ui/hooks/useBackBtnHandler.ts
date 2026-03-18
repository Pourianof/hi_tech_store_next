import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

let modalIdTracker = 0;

const modalStack: number[] = [];

export function useBackBtnHandler({
  onBack,
  disable,
}: {
  onBack: VoidFunction;
  disable?: boolean;
}) {
  const backId = useRef(modalIdTracker++);
  const hasRegisteredRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (disable) {
      return;
    }

    if (hasRegisteredRef.current) {
      return;
    }

    const id = backId.current;

    const handlePopState = () => {
      const poppedId = modalStack.pop();
      if (poppedId == id) {
        onBack();
        window.removeEventListener("popstate", handlePopState);
      } else if (poppedId) {
        modalStack.push(poppedId);
      }
    };

    // to defer the pushing state after immediate destructing and popping state
    setTimeout(() => {
      if (!hasRegisteredRef.current) {
        return;
      }
      if (window.history.state.id != id) {
        window.history.pushState({ id }, "");
        modalStack.push(id);
      }
      window.addEventListener("popstate", handlePopState);
    }, 0);
    hasRegisteredRef.current = true;

    return () => {
      hasRegisteredRef.current = false; // if modal destructed then we must iterate back until close the modal

      if (disable) {
        return;
      }

      if (modalStack.includes(id)) {
        for (let index = modalStack.length - 1; index >= 0; index--) {
          const poppedId = modalStack.at(index); // pop state and close modal
          router.back();

          if (poppedId == id) {
            break;
          }
        }
      }
    };
  }, [onBack, router, disable]);
}
