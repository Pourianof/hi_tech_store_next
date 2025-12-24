import { createContext, ReactNode, useContext } from "react";
import { NoContextDefinedError } from "../errors/NoContextDefinedError";

interface CloseModalState {
  close: VoidFunction;
}

const CloseModalContext = createContext<CloseModalState>(
  {} as unknown as CloseModalState
);

export function ModalCloseProvider({
  children,
  close,
}: { children?: ReactNode } & CloseModalState) {
  return (
    <CloseModalContext.Provider value={{ close }}>
      {children}
    </CloseModalContext.Provider>
  );
}

export function useModalClose() {
  const context = useContext(CloseModalContext);

  if (!context) {
    throw new NoContextDefinedError("CloseModal");
  }

  return context;
}

export function ModalCloser({
  builder,
}: {
  builder: (close: VoidFunction) => ReactNode;
}) {
  const modalCloseCtx = useModalClose();

  return builder(modalCloseCtx.close);
}
