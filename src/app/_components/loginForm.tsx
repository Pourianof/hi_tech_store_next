"use client";
import { signinAction } from "@/lib/server_actions/signinAction";
import Link from "next/link";
import { ErrorLabeledInput } from "../../ui/form/errorLabeledInput";
import { StatefulForm } from "../../ui/form/statefulForm";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const session = useSession();

  return (
    <StatefulForm
      onSubmit={(data) => {
        return signinAction(data.email, data.password);
      }}
      onSubmitionSuccessful={() => {
        session.update();
        router.replace("/");
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
