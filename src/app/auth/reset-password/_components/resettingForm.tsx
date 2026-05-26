"use client";

import { passwordResettingSchema } from "@/core/schemas/passwordChangeSchema";
import { resetPasswordAction } from "@/lib/server_actions/authActions";
import { useAuth } from "@/ui/contexts/authContext";
import { FilledButton } from "@/ui/form/AppButtons";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { StatefulForm } from "@/ui/form/statefulForm";
import { useDelayedRedirect } from "@/ui/redirector";
import { Body } from "@/ui/theme/text/body";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";

export function ResetPassowrdForm({
  children,
  email,
  token,
}: {
  children: ReactNode;
  token: string;
  email: string;
}) {
  const { isLoggedIn } = useAuth();
  const redirect = useDelayedRedirect({
    destinationPath: isLoggedIn ? "/" : "/login",
    timeout: 2000,
  });
  const [hasReset, setHasReset] = useState(false);

  return (
    <StatefulForm
      formName="reset-password"
      onValidation={(data) => {
        const result = passwordResettingSchema.safeParse({
          ...data,
          token,
          email,
        });

        if (result.success) {
          return { validData: result.data };
        }

        return { errors: zodToRhsError(result.error) };
      }}
      onSubmit={resetPasswordAction}
      onSubmitionSuccessful={() => {
        toast.success("Your password reset succussfully");
        setHasReset(true);
        redirect();
      }}
    >
      {children}
      {hasReset ? (
        <Body className="text-success" size="md">
          Your password changed succussfully
        </Body>
      ) : (
        <StatefulForm.Submitter
          render={(submitter) => (
            <FilledButton onClick={submitter}>
              <Body size="md">Submit</Body>
            </FilledButton>
          )}
        />
      )}
    </StatefulForm>
  );
}
