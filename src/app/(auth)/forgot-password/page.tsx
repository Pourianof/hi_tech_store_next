import { Column } from "@/ui/layouts/column";
import { Card } from "@/ui/theme/card";
import { Body } from "@/ui/theme/text/body";
import { H4 } from "@/ui/theme/text/headers";
import { ForgotPasswrodForm } from "./_components/forgotPasswordForm";

export default function Page() {
  return (
    <Card noShadow className="border max-w-1/4 mx-auto" noHoverReaction>
      <Column className="gap-4">
        <H4>Forgot password</H4>
        <Body
          size="md"
          className="text-gray-neutral-44 bg-gray-neutral-ed border border-gray-neutral-9e rounded p-2"
        >
          We will send a link to your email that you can use to reset your
          password
        </Body>
        <ForgotPasswrodForm />
      </Column>
    </Card>
  );
}
