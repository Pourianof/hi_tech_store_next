"use client";

import { Modal } from "@/ui/modal/modal";
import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export function HeaderModalHoverZone({
  children,
  modalContent,
  name,
  zoneClassName,
}: {
  children: ReactElement<HTMLElement>;
  modalContent: ReactElement<HTMLElement>;
  name: string;
  zoneClassName?: string;
}) {
  const { cancel, display } = useHeaderModalContext(name);

  function handleMouseEnter() {
    display(modalContentBuilder);
  }
  function handleMouseLeave() {
    cancel();
  }

  const modalContentBuilder: ModalContentBuilder = (reset, cancel) => (
    <div onMouseEnter={reset} onMouseLeave={cancel} className={zoneClassName}>
      {modalContent}
    </div>
  );

  const cloned = cloneElement(children, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  });

  return cloned;
}

function useHeaderModalContext(name: string) {
  const ctx = useContext(HeaderModalContext);

  return {
    display: (node: ModalContentBuilder) => {
      ctx.display(node, name);
    },
    cancel() {
      ctx.cancel(name);
    },
  };
}

type ModalContentBuilder = (
  reset: VoidFunction,
  cancel: VoidFunction,
) => ReactNode;

interface HeaderModalActions {
  // using builder because of last state of container will used on modalContent actions(mouse enter/leave)
  display(node: ModalContentBuilder, name: string): void;
  cancel(name: string): void;
}

const HeaderModalContext = createContext<HeaderModalActions>(
  {} as unknown as HeaderModalActions,
);

export function HeaderModalRenderContainer({
  children,
}: {
  children: ReactNode;
}) {
  const [displayingId, setDisplayingId] = useState<string>();
  const displayingNodeBuilder = useRef<ModalContentBuilder>(null);
  const cancellingTimeoutRef = useRef<number>(null);
  const cancellingIdRef = useRef<string>(null);

  useEffect(() => {
    return () => {
      if (cancellingTimeoutRef.current) {
        window.clearTimeout(cancellingTimeoutRef.current);
      }
    };
  });

  function resetTimer() {
    if (cancellingTimeoutRef.current) {
      window.clearTimeout(cancellingTimeoutRef.current);
      cancellingTimeoutRef.current = null;
      cancellingIdRef.current = null;
    }
  }

  const display = useCallback((node: ModalContentBuilder, name: string) => {
    resetTimer();
    displayingNodeBuilder.current = node;
    setDisplayingId(name);
  }, []);
  function cancelDisplay() {
    displayingNodeBuilder.current = null;
    setDisplayingId(undefined);

    cancellingTimeoutRef.current = null;
    cancellingIdRef.current = null;
  }

  const cancel = (id: string) => {
    // if id matched and no canceling scheduled
    if (displayingId == id && !cancellingTimeoutRef.current) {
      // delay cancel for 0.5 second
      cancellingTimeoutRef.current = window.setTimeout(cancelDisplay, 300);
      cancellingIdRef.current = id;
    }
  };

  const node = displayingNodeBuilder.current?.(resetTimer, () =>
    cancel(displayingId!),
  );

  return (
    <HeaderModalContext.Provider value={{ display, cancel }}>
      {children}

      {!!node && (
        <>
          <Modal
            containerClassName="hidden"
            className="z-10"
            backBtnHandling={false}
            diableScroll={false}
          >
            {null}
          </Modal>
          <div className="absolute w-full top-full left-0 flex justify-end mx-auto translate-y-[1px]">
            {node}
          </div>
        </>
      )}
    </HeaderModalContext.Provider>
  );
}
