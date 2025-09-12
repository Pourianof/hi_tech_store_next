"use client";

import { usePathname } from "next/navigation";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";
import Link from "next/link";

export function AuthBox({ mode }: { mode: "login" | "register" }) {
  const pathname = usePathname();

  const activeClassNames = (path: string) =>
    pathname === path
      ? "text-blue-700 border-b-blue-700 border-b-1"
      : "text-gray-500 border-b-gray-500 border-b-1";

  return (
    <div className="bg-white rounded-2xl p-6">
      <div>
        <Link
          href="/login"
          className={`inline-block w-[50%] text-center ${activeClassNames(
            "/login"
          )}`}
        >
          Login
        </Link>
        <Link
          href="/register"
          className={`inline-block w-[50%] text-center ${activeClassNames(
            "/register"
          )}`}
        >
          Create Account
        </Link>
      </div>
      <h2 className="my-4 text-center text-lg font-semibold">
        {mode == "login" ? "Login in to Hi-Tech Store" : "Create your account"}
      </h2>
      {mode == "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
