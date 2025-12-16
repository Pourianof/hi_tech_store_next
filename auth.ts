import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn as apiSignIn } from "@/api/authApi";
import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";
import { User } from "@/core/models/user";

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
            "Missing username(or email) or password"
          );
        }

        const data = await apiSignIn(
          {
            email: credentials.email as string,
            username: credentials.username as string,
          },
          credentials.password as string
        );

        if (data) {
          const { token: apiToken, user, expiresAt } = data;
          return {
            email: user.email,
            name: user.firstName,
            firstName: user.firstName,
            lastName: user.lastName,
            apiToken,
            id: user.userName,
            role: data.user.role,
            expiresAt,
          };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // login
      if (user) {
        token.id = user.id;
        token.apiToken = (user as { apiToken: string })?.apiToken;
        token.exp = (user as { expiresAt: number })?.expiresAt;

        const _user = user as User;
        token.lastName = _user.lastName;
        token.role = _user.role;
      }

      const oneMinuteAnd30SecondsMs = 90000;

      if (
        token.exp &&
        Date.now() >= token.exp * 1000 - oneMinuteAnd30SecondsMs
      ) {
        return null;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token.apiToken) {
        return null;
      }

      if (token) {
        session.user.id = token.id as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as string;

        session.apiToken = (token as { apiToken: string }).apiToken;
      }

      return session;
    },
  },
} as NextAuthConfig);
