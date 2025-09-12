import { AuthBox } from "@/app/_components/authBox";
import { Modal } from "@/ui/modal";

export default function InterceptedLogin() {
  return (
    <Modal>
      <AuthBox mode="login" />
    </Modal>
  );
}
