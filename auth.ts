import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn as apiSignIn } from "@/api/authApi";
import { AuthenticationError } from "@/core/errors/AuthErrors/AuthenticationError";

export const CREDENTIAL_PROVIDER_ID = "credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: CREDENTIAL_PROVIDER_ID,
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new AuthenticationError("Missing email or password");
        }

        const data = await apiSignIn(
          credentials.email as string,
          credentials.password as string
        );

        if (data) {
          const { token, user } = data;
          return {
            email: user.email,
            name: user.firstName,
            firstName: user.firstName,
            lastName: user.lastName,
            token,
          };
        }

        return null;
      },
    }),
  ],
});
