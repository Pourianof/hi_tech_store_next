import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { routes } from "@/app/routes";

export async function protectRoute(opts?: { callbackRoute?: string }) {
  const session = await auth();

  if (!session) {
    const searchParams = new URLSearchParams();
    if (opts?.callbackRoute) {
      searchParams.append("redirect", opts.callbackRoute);
    }
    const hasAny = !!searchParams.size;
    redirect(
      `${routes.auth.login}${hasAny ? "?" : ""}${searchParams.toString()}`
    );
  }
}
