import { AuthBox } from "@/app/_components/authBox";
import { RedirectModal } from "@/ui/modal/redirectModel";

export default function InterceptedLogin() {
  return (
    <RedirectModal>
      <AuthBox mode="login" />
    </RedirectModal>
  );
}
