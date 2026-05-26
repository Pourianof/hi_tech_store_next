import { FailedBox } from "@/app/_components/failedBox";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { Column } from "@/ui/layouts/column";
import { Body } from "@/ui/theme/text/body";
import { H4 } from "@/ui/theme/text/headers";
import { SearchParams } from "next/dist/server/request/search-params";
import { ResetPassowrdForm } from "./_components/resettingForm";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const token = sp.token;
  const email = sp.email;

  if (!email || !token) {
    const emailExist = !!email;
    const notExistOne = emailExist ? "token" : "email";

    return (
      <FailedBox
        title="Bad link"
        message={`No ${notExistOne} defined in url`}
      />
    );
  }

  return (
    <Column className="max-w-[400px] mx-auto my-12 gap-4 border border-gray-neutral-ed p-8 rounded-lg shadow-1">
      <H4>Reset password</H4>
      <Body size="md">Email: {email}</Body>
      <ResetPassowrdForm email={email as string} token={token as string}>
        <LabeldInput label="New Password">
          <ErrorLabeledInput
            filedName="newPassword"
            type="password"
            placeholder="New password"
          />
        </LabeldInput>
        <LabeldInput label="Repeat your password">
          <ErrorLabeledInput
            filedName="passwordConfirmation"
            type="password"
            placeholder="Password confirmation"
          />
        </LabeldInput>
      </ResetPassowrdForm>
    </Column>
  );
}
