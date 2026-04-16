import * as nextAuth from "next-auth";
import { User } from "@/core/models/user";

type SessionCallbackParameters = Parameters<
  NonNullable<nextAuth.NextAuthConfig["callbacks"]>["session"]
>;

type Awaitable<T> = T | PromiseLike<T>;

declare module "next-auth" {
  // interface User {
  //   email: string;
  //   name: string;
  //   access_token: string;
  //   refresh_token: string;
  //   expires_on: number;
  //   exp: number;
  //   iat: number;
  //   jti: string;
  // }

  interface NextAuthConfig extends nextAuth.NextAuthConfig {
    callbacks: nextAuth.NextAuthConfig["callbacks"] & {
      session: (params: SessionCallbackParameters) => Awaitable<Session | null>;
    };
  }

  interface Session extends nextAuth.DefaultSession {
    user: User;
    expires_in: string;
    error?: Record<string, string>;
    apiToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    expiresAt: number;
    apiToken: string;
    refToken: string;
  }
}
