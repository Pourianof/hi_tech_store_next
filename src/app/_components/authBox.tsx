"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signinAction } from "@/lib/server_actions/signinAction";
import { AuthResult } from "@/core/Dtos/AuthResult";
import { useState } from "react";

export function AuthBox() {
  const pathname = usePathname();
  const [totalError, setTotalError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const activeClassNames = (path: string) =>
    pathname === path
      ? "text-blue-700 border-b-blue-700 border-b-1"
      : "text-gray-500 border-b-gray-500 border-b-1";

  return (
    <div className="bg-white rounded-2xl p-6">
      <form
        onSubmit={handleSubmit(async (data) => {
          const result = (await signinAction(
            data.email,
            data.password
          )) as AuthResult;
          if (result.status === "failed") {
            if (result.errors) {
              Object.keys(result.errors).forEach((key) => {
                const normalizedKey = key.toLowerCase();
                if (normalizedKey == "email") {
                  setError(normalizedKey, {
                    message: result.errors![
                      key as never as number
                    ][0] as unknown as string,
                  });
                }
              });
            } else if (result.description) {
              setTotalError(result.description);
            }
          }
        })}
      >
        <div>
          <button
            className={`w-[50%] text-center ${activeClassNames("/auth")}`}
          >
            Login Login
          </button>
          <button
            className={`w-[50%] text-center ${activeClassNames("/register")}`}
          >
            Create Account
          </button>
        </div>
        <div>
          <h2 className="my-4 text-center text-lg font-semibold">
            Login in to Hi-Tech Store
          </h2>
          <div>
            <input
              type="text"
              placeholder="Email or username"
              className="border p-2 rounded w-full"
              {...register("email", {
                required: "Email or username is required",
              })}
            />
            {errors.email && (
              <span className="text-red-500">
                {errors.email.message as string}
              </span>
            )}
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded w-full mt-2"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500">
                {errors.password.message as string}
              </span>
            )}
          </div>
          <div>
            <Link href="/forgot-password" className="text-blue-500">
              Forgot your password?
            </Link>
          </div>
          <div>
            <label htmlFor="rememberMe" className="ml-2">
              <input
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
              />
              Keep me logged in
            </label>
          </div>
          {totalError && <div className="text-red-500">{totalError}</div>}
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Login
            </button>
          </div>
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
        </div>
      </form>
    </div>
  );
}
