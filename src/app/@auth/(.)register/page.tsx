import { AuthBox } from "@/app/_components/authBox";
import { Modal } from "@/ui/modal";

export default function InterceptedRegister() {
  return (
    <Modal>
      <AuthBox mode="register" />
    </Modal>
  );
}
