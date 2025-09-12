"use client";
import { AuthResult } from "@/core/Dtos/AuthResult";
import { signinAction } from "@/lib/server_actions/signinAction";
import Link from "next/link";
import { useState } from "react";
import { ErrorLabeledInput } from "../../ui/form/errorLabeledInput";
import { StatefulForm } from "../../ui/form/statefulForm";
import { useFormContext } from "react-hook-form";
import { handleProblemDetailErrors } from "@/lib/helpers/problemDetailsHelper";

export function LoginForm() {
  const [totalError, setTotalError] = useState<string>();

  return (
    <StatefulForm
      onSubmit={async (data, { setError }) => {
        const result = (await signinAction(
          data.email,
          data.password
        )) as AuthResult;
        if (result.status === "failed") {
          if (result.errors) {
            handleProblemDetailErrors({
              errors: result.errors!,
              keys: ["email"],
              onMatched(key, message) {
                setError(key, { message });
              },
            });
          } else if (result.description) {
            setTotalError(result.description);
          }
        }
      }}
    >
      <ErrorLabeledInput
        type="text"
        placeholder="Email or username"
        filedName="email"
      />

      <ErrorLabeledInput
        type="password"
        placeholder="Password"
        filedName="password"
      />
      <Link href="/forgot-password" className="text-blue-500">
        Forgot your password?
      </Link>
      <RememberMeInput />
      {totalError && <div className="text-red-500">{totalError}</div>}
      <button
        type="submit"
        className="hover:cursor-pointer bg-blue-500 text-white p-2 rounded w-full"
      >
        Login
      </button>
      <div>
        <h3>Or Log In with</h3>
        <div className="flex gap-2">
          <button className="bg-red-500 text-white p-2 rounded w-full">
            Google
          </button>
          <button className="bg-blue-600 text-white p-2 rounded w-full">
            Facebook
          </button>
        </div>
      </div>
    </StatefulForm>
  );
}

function RememberMeInput() {
  const { register } = useFormContext();
  return (
    <label htmlFor="rememberMe" className="ml-2">
      <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
      Keep me logged in
    </label>
  );
}
