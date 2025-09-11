"use client";

import { AuthBox } from "@/app/_components/authBox";
import { Modal } from "@/app/_components/modal";

export default function InterceptedLogin() {
  return (
    <Modal>
      <AuthBox />
    </Modal>
  );
}
