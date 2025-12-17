import { AuthBox } from "@/app/_components/authBox";
import { RedirectModal } from "@/ui/modal/redirectModel";

export default function InterceptedRegister() {
  return (
    <RedirectModal>
      <AuthBox mode="register" />
    </RedirectModal>
  );
}
