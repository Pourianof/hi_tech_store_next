"use client";
import { ModalEditableInput } from "@/app/account/_components/ModalEditForm";
import { updateUserAction } from "@/lib/server_actions/userActions";
import { useAuth } from "@/ui/contexts/authContext";
import { SubmitSensitiveButton } from "@/ui/form/AppButtons";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";

export function FullNameInput() {
  const { update, data, isLoading } = useAuth();

  const firstName = data?.user.firstName;
  const lastName = data?.user.lastName;

  return (
    <ModalEditableInput
      iconName="user"
      label="Full name"
      value={isLoading ? "loading..." : `${firstName} ${lastName}`}
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
          initValue={firstName}
        />
        <ErrorLabeledInput
          filedName="lastName"
          placeholder="Lastname"
          type="text"
          initValue={lastName}
        />
      </div>
      <div>
        <SubmitSensitiveButton>Save</SubmitSensitiveButton>
      </div>
    </ModalEditableInput>
  );
}
