"use client";
import { forgotPasswordAction } from "@/lib/server_actions/authActions";
import { FilledButton } from "@/ui/form/AppButtons";
import { LabeldInput } from "@/ui/form/inputs";
import { TextInput } from "@/ui/form/textInput";
import { Column } from "@/ui/layouts/column";
import { Caption } from "@/ui/theme/text/caption";
import { H4 } from "@/ui/theme/text/headers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import z from "zod";

export function ForgotPasswrodForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [hasEmailSent, setHasEmailSent] = useState(false);

  async function handleChange() {
    const emailResult = z.email().safeParse(email);

    if (!emailResult.success) {
      setError(emailResult.error.issues.at(0)?.message ?? "");
      return;
    }
    setError("");

    const result = await forgotPasswordAction(email);

    if (result.status != "success") {
      setError(result.data.title);
      toast.error(
        <Column>
          <H4>{result.data.title}</H4>
          <Caption size="md">{result.data.detail}</Caption>
        </Column>,
      );
      return;
    }

    toast.success("A link sent to your email. Check your mail");

    setHasEmailSent(true);
  }

  useEffect(() => setHasEmailSent(false), [email]);

  return (
    <>
      <LabeldInput label="Enter email of your account">
        <TextInput
          placeholder="email/username"
          className="border-slate-500"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail((e.target as HTMLInputElement).value);
          }}
        />
        {!!error && (
          <Caption size="md" className="text-error">
            {error}
          </Caption>
        )}
      </LabeldInput>
      <FilledButton onClick={handleChange} disabled={hasEmailSent}>
        {hasEmailSent ? "Email sent" : "Submit"}
      </FilledButton>
    </>
  );
}
