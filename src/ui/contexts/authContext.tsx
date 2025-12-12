import { useSession } from "next-auth/react";

export function useAuth() {
  const session = useSession();

  return {
    ...session,
    isLoggedIn: session.status === "authenticated",
    isLoading: session.status === "loading",
  };
}
