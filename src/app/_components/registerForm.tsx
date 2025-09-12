import Link from "next/link";
import { ErrorLabeledInput } from "../../ui/form/errorLabeledInput";
import { StatefulForm } from "../../ui/form/statefulForm";
import { registerAction } from "@/lib/server_actions/registerAction";
import { RegisterDto } from "@/core/Dtos/RegisterDto";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { handleProblemDetailErrors } from "@/lib/helpers/problemDetailsHelper";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [totalError, setTotalError] = useState<string>();

  async function onSubmit(
    data: Record<string, string>,
    { setError }: UseFormReturn
  ) {
    const result = await registerAction(data as unknown as RegisterDto);
    if (result.status === "failed") {
      if (result.errors) {
        handleProblemDetailErrors({
          errors: result.errors,
          keys: ["firstname", "username", "lastname", "email", "password"],
          onMatched(key, message) {
            setError(key, { message });
          },
        });
      } else if (result.description) {
        setTotalError(result.description);
      }
      return;
    }

    router.replace("/login");
    toast("Sign-up succussfully. Now you can login.", {
      className: "bg-green-800",
    });
  }
  return (
    <StatefulForm onSubmit={onSubmit}>
      <ErrorLabeledInput type="text" placeholder="Name" filedName="firstname" />
      <ErrorLabeledInput
        type="text"
        placeholder="Lastname"
        filedName="lastname"
      />
      <ErrorLabeledInput
        type="text"
        placeholder="Username"
        filedName="username"
        validationOptions={{
          minLength: 4,
          maxLength: 16,
        }}
      />
      <ErrorLabeledInput type="email" placeholder="Email" filedName="email" />
      <ErrorLabeledInput
        type="password"
        placeholder="Password"
        filedName="password"
        validationOptions={{
          minLength: { value: 6, message: "Password must at least 6 chars" },
          maxLength: { value: 16, message: "Password must at most 16 chars" },
        }}
      />
      <ErrorLabeledInput
        type="password"
        placeholder="Password Confirmation"
        filedName="confirmPassword"
        validationOptions={{
          validate: (value, values) => {
            return (
              value !== values.password &&
              "Password confirmation not matched with password field"
            );
          },
        }}
      />
      <TermAndConditionAgreetionCheckBox />
      {!!totalError && (
        <span className="text-red-500 text-sm">{totalError}</span>
      )}
      <button
        type="submit"
        className="bg-blue-600  text-white p-2 rounded w-full"
      >
        Create Account
      </button>
    </StatefulForm>
  );
}

function TermAndConditionAgreetionCheckBox() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors.agree?.message as string;
  return (
    <div>
      <label className="block">
        <input
          className="me-1.5 align-middle"
          type="checkbox"
          {...register("agree", {
            required: "You must agree with conditions and policies",
          })}
        />
        I agree to all
        <Link className="text-blue-600 underline" href={"/terms"}>
          Terms & Conditions
        </Link>
      </label>
      {!!errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
}
