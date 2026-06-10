import { LoginForm } from "@/app/_components/loginForm";
import { Column } from "@/ui/layouts/column";
import { Card } from "@/ui/theme/card";
import { Caption } from "@/ui/theme/text/caption";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <Card className="max-w-1/3 shadow-2xl mx-auto">
      <Column className="gap-4">
        <div className="p-4 border-b border-b-gray-neutral-9e">
          <LoginForm />
        </div>
        <Caption size="md" className="text-gray-neutral-71">
          If you don&apos;t have account,{" "}
          <Link
            href={{ pathname: "/register" }}
            className="text-primary-blue-0c"
          >
            Create new account
          </Link>
        </Caption>
      </Column>
    </Card>
  );
}
