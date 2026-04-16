import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn as apiSignIn, refreshTheTokenApi } from "@/api/authApi";
import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";
import { User } from "@/core/models/user";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { encryptHelper } from "@/lib/utils/encryptor";

export const CREDENTIAL_PROVIDER_ID = "credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: CREDENTIAL_PROVIDER_ID,
      credentials: {
        email: { label: "Email", type: "email" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          (!credentials.email && !credentials.username) ||
          !credentials.password
        ) {
          throw new AuthenticationError(
            "Missing username(or email) or password",
          );
        }

        const data = await apiSignIn(
          {
            email: credentials.email as string,
            username: credentials.username as string,
          },
          credentials.password as string,
        );
        if (data) {
          const { token: apiToken, user, expiresAt, refreshToken } = data;
          return {
            email: user.email,
            refreshToken,
            firstName: user.firstName,
            lastName: user.lastName,
            apiToken,
            id: user.userName,
            role: user.role,
            expiresAt,
          };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        token.user = { ...(token.user ?? {}), ...session.user };
      }
      // login
      if (user) {
        token.id = user.id;
        const userModel = user as { apiToken: string; refreshToken: string };
        token.apiToken = userModel.apiToken;
        token.expiresAt = new Date(
          (user as { expiresAt: string })?.expiresAt,
        ).getTime();

        const encryptedRefToken = encryptHelper.encrypt(userModel.refreshToken);

        token.refToken = encryptedRefToken;
        token.user = user;
      }

      const oneMinuteAnd30SecondsMs = 90000;
      const tkn: JWT = token as JWT;

      if (
        tkn.expiresAt &&
        Date.now() >= token.expiresAt - oneMinuteAnd30SecondsMs
      ) {
        if (tkn.refToken) {
          try {
            const refToken = encryptHelper.decrypt(tkn.refToken);
            const result = await refreshTheTokenApi(refToken);

            if (result.status == "success") {
              tkn.apiToken = result.data.token;
              tkn.expiresAt = tkn.exp = new Date(
                result.data.expiresAt,
              ).getTime();

              return tkn;
            }
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token || !token.apiToken) {
        return null;
      }

      session.apiToken = token.apiToken;
      session.refreshToken = token.refToken;
      session.user = token.user as AdapterUser & User;

      return session;
    },
  },
} as NextAuthConfig);
