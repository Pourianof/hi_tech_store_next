"use client";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useBackBtnHandler } from "../hooks/useBackBtnHandler";
import { MODAL_CONTAINER_ID } from "./modalContainer";
import { twMerge } from "tailwind-merge";

interface IModalContextState {
  isBackBtnHandled: boolean;
}

const ModalContext = createContext<IModalContextState>(
  {} as unknown as IModalContextState,
);

type ModalVariants = "full-page" | "center" | "standard" | "raw" | "center-x";
type RequiredOnClose = { onClose: VoidFunction };
export function Modal<TBack extends boolean, TVariant extends ModalVariants>({
  children,
  onClose,
  className,
  variants = "center" as TVariant,
  diableScroll = true,
  containerClassName,
  backBtnHandling = true as TBack,
  noPadding = false,
}: {
  children: ReactNode;
  className?: string;
  variants?: TVariant;
  diableScroll?: boolean;
  containerClassName?: string;
  backBtnHandling?: TBack;
  noPadding?: boolean;
} & (TBack extends true
  ? RequiredOnClose
  : TVariant extends "full-page"
    ? RequiredOnClose
    : Partial<RequiredOnClose>)) {
  const isBackBtnHandled = backBtnHandling || variants == "full-page";

  const [hasOverflowed, setHasOverflowed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const backHandler = useCallback(() => {
    if (isBackBtnHandled) {
      onClose?.();
    }
  }, [isBackBtnHandled, onClose]);

  useBackBtnHandler({
    onBack: backHandler,
    disable: !isBackBtnHandled,
  });

  useLayoutEffect(() => {
    if (diableScroll) {
      window.document.body.style.overflow = "hidden";
      return () => {
        window.document.body.style.overflow = "auto";
      };
    }
  }, [diableScroll]);

  const checkOverflow = useCallback(function () {
    const container = containerRef.current;
    if (!container) return;
    const diff = window.innerHeight - container!.scrollHeight;
    const hasOverflow = diff < 0 || diff / window.innerHeight < 0.05;

    if (hasOverflow == hasOverflowed) {
      return;
    }

    setHasOverflowed(hasOverflow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    checkOverflow();
  }, [children, checkOverflow]);

  useEffect(() => {
    function resizeHandler() {
      checkOverflow();
    }
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("", resizeHandler);
  }, [checkOverflow]);

  let overlayClassName;
  let _containerClassName = "";

  switch (variants) {
    case "center":
      overlayClassName = "items-center justify-center";
      _containerClassName = "rounded-2xl shadow-xl";
      break;
    case "full-page":
      overlayClassName = "items-stretch";
      _containerClassName = "w-full";
      break;

    case "standard":
      overlayClassName = "items-center";
      _containerClassName = "rounded-2xl shadow-xl";
      break;
    case "center-x":
      overlayClassName = "justify-center";
      _containerClassName = "rounded-2xl shadow-xl";
      break;
    case "raw":
      _containerClassName = "";
  }

  return createPortal(
    <ModalContext.Provider value={{ isBackBtnHandled: isBackBtnHandled }}>
      <div
        className={twMerge(
          "fixed inset-0 bg-black/50 flex z-50 ",
          overlayClassName,
          className ?? "",
        )}
      >
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-10"
          onClick={(e) => {
            e.preventDefault();
            onClose?.();
          }}
        ></div>
        <div
          ref={containerRef}
          className={twMerge(
            "bg-white z-20",
            !noPadding ? "p-6 " : "",
            _containerClassName,
            containerClassName ?? "",
          )}
          style={
            hasOverflowed
              ? {
                  position: "absolute",
                  top: "10dvh",
                  bottom: "5dvh",
                }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.getElementById(MODAL_CONTAINER_ID) || document.body,
  );
}

// useful when wanna using normal btn against of back btn and
// need to handle the back btn also

// New version of useBackHandler: No need for thi
export function ModalCloser({
  builder,
}: {
  builder: (close: VoidFunction) => ReactNode;
}) {
  const modalContext = useContext(ModalContext);
  const router = useRouter();

  const closeModal = useCallback(() => {
    if (modalContext.isBackBtnHandled) {
      router.back();
    }
  }, [modalContext.isBackBtnHandled, router]);

  return builder(closeModal);
}
