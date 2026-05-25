"use client";
import { EditableInput } from "@/app/account/_components/EditableInput";
import { passwordChangeSchema } from "@/core/schemas/passwordChangeSchema";
import { changePasswordAction } from "@/lib/server_actions/authActions";
import { FilledButton } from "@/ui/form/AppButtons";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { Body } from "@/ui/theme/text/body";
import { H5, H6 } from "@/ui/theme/text/headers";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

export function PasswordInput() {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      {showEditModal && (
        <PasswordEditingModal onClose={() => setShowEditModal(false)} />
      )}
      <EditableInput
        iconName="key"
        label="Password"
        value={"***************"}
        onEdit={() => setShowEditModal(true)}
      />
    </>
  );
}

function PasswordEditingModal({ onClose }: { onClose(): void }) {
  return (
    <Modal containerClassName="w-[300px]">
      <StatefulForm
        formName="password-change"
        onValidation={(data) => {
          const result = passwordChangeSchema.safeParse(data);

          if (result.success) {
            return { validData: result.data };
          }

          return { errors: zodToRhsError(result.error) };
        }}
        onSubmit={async (data) => {
          const result = await changePasswordAction(data);

          return result;
        }}
        onSubmitionSuccessful={() => {
          toast.success(<H6>Password changed succussfully</H6>);
          onClose();
        }}
      >
        <H5>Change password</H5>
        <LabeldInput label="Current password">
          <ErrorLabeledInput
            filedName="oldPassword"
            placeholder="Your current password"
            type="password"
          />
        </LabeldInput>
        <LabeldInput label="New password">
          <ErrorLabeledInput
            filedName="newPassword"
            placeholder="New password"
            type="password"
          />
        </LabeldInput>
        <LabeldInput label="Password Confirmation">
          <ErrorLabeledInput
            filedName="passwordConfirmation"
            placeholder="Password confirmation"
            type="password"
          />
        </LabeldInput>
        <Row>
          <button
            className="hover:cursor-pointer px-4 py-1 border border-transparent hover:border-gray-200 rounded hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <Column className="h-full" center>
              <Body size="md">Cancel</Body>
            </Column>
          </button>
          <StatefulForm.Submitter
            render={(submitter, isSubmitting) => (
              <FilledButton onClick={() => submitter()} disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={15} /> : "Submit"}
              </FilledButton>
            )}
          />
        </Row>
      </StatefulForm>
    </Modal>
  );
}
