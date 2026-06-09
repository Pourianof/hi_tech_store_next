import { signOut, useSession } from "next-auth/react";

export function useAuth() {
  const session = useSession();

  function logout() {
    signOut();
  }

  return {
    ...session,
    isLoggedIn: session.status === "authenticated",
    isLoading: session.status === "loading",
    logout,
  };
}
