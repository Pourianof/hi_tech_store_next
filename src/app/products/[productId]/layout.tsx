import { ReactNode } from "react";

export default function Layout({
  commentsModal,
  children,
}: {
  commentsModal: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      {commentsModal}
      {children}
    </>
  );
}
