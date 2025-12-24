"use client";
import { ModalEditableInput } from "@/app/account/_components/ModalEditForm";
import { updateUserAction } from "@/lib/server_actions/userActions";
import { FilledButton } from "@/ui/form/AppButtons";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { useSession } from "next-auth/react";

export function FullNameInput({
  name,
  lastName,
}: {
  name: string;
  lastName: string;
}) {
  const { update } = useSession();

  return (
    <ModalEditableInput
      iconName="user"
      label="Full name"
      value={`${name} ${lastName}`}
      modalTitle="First name and Last name"
      onSubmit={(data) => {
        return updateUserAction(data);
      }}
      onSubmitionSuccessful={async (data, close) => {
        await update({
          user: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        });

        close();
      }}
    >
      <div className="space-y-2">
        <ErrorLabeledInput
          filedName="firstName"
          placeholder="Firstname"
          type="text"
          initValue={name}
        />
        <ErrorLabeledInput
          filedName="lastName"
          placeholder="Lastname"
          type="text"
          initValue={lastName}
        />
      </div>
      <div>
        <FilledButton type="submit">Save</FilledButton>
      </div>
    </ModalEditableInput>
  );
}
