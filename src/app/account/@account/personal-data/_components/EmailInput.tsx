"use client";
import { ModalEditableInput } from "@/app/account/_components/ModalEditForm";
import { updateUserAction } from "@/lib/server_actions/userActions";
import { useAuth } from "@/ui/contexts/authContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { TextField } from "@mui/material";

export function EditableEmailInput() {
  const { data, isLoading } = useAuth();

  return (
    <ModalEditableInput
      iconName="email"
      label="E-mail Address"
      value={isLoading ? "loading..." : data?.user.email}
      modalTitle="Email"
      onSubmit={(data) => {
        return updateUserAction(data);
      }}
      onSubmitionSuccessful={async () => {}}
    >
      <div>
        <TextField
          value={data?.user.email}
          label="Email"
          variant="outlined"
          disabled
          fullWidth
        />
        <ErrorLabeledInput
          filedName="email"
          placeholder="New email"
          type="email"
        />
        <div className="p-2 rounded bg-slate-200 text-slate-800 text-sm">
          We will send verification code to your email.
          <br />
          Make sure you insert correct email.
        </div>
      </div>
    </ModalEditableInput>
  );
}
