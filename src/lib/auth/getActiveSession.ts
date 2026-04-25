import { cookies } from "next/headers";
import { updateCookieSessionIfNeeded } from "./sessionMaintainer";
import { SESSION_COOKIE } from "./sessionConsts";
import { decode } from "next-auth/jwt";
import { Session } from "next-auth";
import "next-auth/jwt";

export async function getActiveSession() {
  const _cookies = await cookies();
  const sessionCookie = _cookies.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return;
  }

  const token = await decode({
    secret: process.env.AUTH_SECRET!,
    salt: SESSION_COOKIE,
    token: sessionCookie,
  });

  if (!token) {
    return;
  }

  const tkn = await updateCookieSessionIfNeeded(token, _cookies);

  if (!tkn) {
    return null;
  }

  return {
    apiToken: tkn?.apiToken,
    refreshToken: tkn.refToken,
    user: tkn.user,
    expires: new Date(tkn.expiresAt).toDateString(),
  } as Session;
}
