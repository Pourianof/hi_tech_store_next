import { RegisterForm } from "@/app/_components/registerForm";
import { Card } from "@/ui/theme/card";

export const metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <Card className="max-w-1/3 shadow-2xl mx-auto">
      <RegisterForm />{" "}
    </Card>
  );
}
