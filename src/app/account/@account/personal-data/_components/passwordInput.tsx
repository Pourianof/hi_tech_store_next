"use client";
import { EditableInput } from "@/app/account/_components/EditableInput";
import { passwordChangeSchema } from "@/core/schemas/passwordChangeSchema";
import {
  changePasswordAction,
  forgotPasswordAction,
} from "@/lib/server_actions/authActions";
import { useAuth } from "@/ui/contexts/authContext";
import { FilledButton } from "@/ui/form/AppButtons";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { StatefulForm } from "@/ui/form/statefulForm";
import { TextInput } from "@/ui/form/textInput";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { H5, H6 } from "@/ui/theme/text/headers";
import { CircularProgress, IconButton } from "@mui/material";
import { ReactNode, useState } from "react";
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
  const [displayForgettingPassView, setDisplayForgettingPassView] =
    useState(false);

  return (
    <Modal containerClassName="w-[300px]">
      {displayForgettingPassView ? (
        <ResetEmailForm
          onBack={() => setDisplayForgettingPassView(false)}
          onClose={onClose}
        />
      ) : (
        <>
          <H5>Change password</H5>

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
            <button
              onClick={(e) => {
                e.preventDefault();
                setDisplayForgettingPassView(true);
              }}
              className="self-start"
            >
              <Caption
                size="md"
                className="text-primary-blue-0c hover:text-primary-blue-09 cursor-pointer"
              >
                I forget my password
              </Caption>
            </button>
            <Row>
              <CancelButton onClick={onClose}>Cancel</CancelButton>

              <StatefulForm.Submitter
                render={(submitter, isSubmitting) => (
                  <FilledButton
                    onClick={() => submitter()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size={15} /> : "Submit"}
                  </FilledButton>
                )}
              />
            </Row>
          </StatefulForm>
        </>
      )}
    </Modal>
  );
}

function CancelButton({
  onClick,
  children,
}: {
  onClick(): void;
  children: ReactNode;
}) {
  return (
    <button
      className="hover:cursor-pointer px-4 py-1 border border-transparent hover:border-gray-200 rounded hover:bg-gray-100"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <Column className="h-full" center>
        <Body size="md">{children}</Body>
      </Column>
    </button>
  );
}

function ResetEmailForm({
  onBack,
  onClose,
}: {
  onClose: VoidFunction;
  onBack: VoidFunction;
}) {
  const { data } = useAuth();
  const [isResetting, setIsResetting] = useState(false);
  const [hasEmailSent, setHasEmailSent] = useState(false);

  return (
    <Column className="gap-2">
      <Row className="justify-between">
        <H5>Send reset link</H5>
        <IconButton onClick={onClose}>
          <Icon name="close" />
        </IconButton>
      </Row>
      {!data?.user.email ? (
        <Column className="gap-4">
          <H5>No active session</H5>
          <Caption size="md">You may not logged-in</Caption>
        </Column>
      ) : (
        <>
          <TextInput readOnly value={data?.user.email} />
          <Caption size="md" className="text-gray-neutral-71">
            We will send a link to your submitted email and you can change your
            password via that link
          </Caption>
        </>
      )}

      <Row>
        <CancelButton onClick={onBack}>Back</CancelButton>
        {!hasEmailSent ? (
          !!data?.user.email && (
            <FilledButton
              disabled={isResetting}
              onClick={async () => {
                setIsResetting(true);
                const result = await forgotPasswordAction(data.user.email);
                if (result.status == "success") {
                  toast.success(
                    "An email with resetting link sent to your email",
                  );
                  setHasEmailSent(true);
                } else {
                  toast.error(
                    <Column className="gap-1">
                      <H6>Something went wrong</H6>
                      <Caption size="md">{result.data.title}</Caption>
                    </Column>,
                  );
                }

                setIsResetting(false);
              }}
            >
              {isResetting ? <CircularProgress size={15} /> : "Send"}
            </FilledButton>
          )
        ) : (
          <Caption
            size="lg"
            className="text-success bg-success-light h-full px-2 py-1 rounded"
          >
            Email had sent
          </Caption>
        )}
      </Row>
    </Column>
  );
}
