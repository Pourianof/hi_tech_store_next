import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "../lib/auth/sessionConsts";
import {
  getRefreshedToken,
  writeSessionCookie,
  writeResponseSessionCookie,
  clearSessionCookie,
} from "../lib/auth/sessionMaintainer";

export async function sessionHandlerMiddleware(request: NextRequest) {
  const token = await getToken({
    secret: process.env.AUTH_SECRET,
    req: request,
    cookieName: SESSION_COOKIE,
    salt: SESSION_COOKIE,
  });

  if (!token) {
    return NextResponse.next();
  }

  const {
    token: refreshedToken,
    encodedSessionToken,
    refreshed,
  } = await getRefreshedToken(token);

  // No refresh needed - continue as-is
  if (!refreshed) {
    return NextResponse.next();
  }

  // Refresh failed - clear the (now-invalid) session everywhere
  if (!refreshedToken || !encodedSessionToken) {
    clearSessionCookie(request.cookies);
    const response = NextResponse.next({ request });
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  // write new token on request to use in further rendering and fetching stuffs
  writeSessionCookie(encodedSessionToken, request.cookies);

  // Build the response based on the mutated request so downstream code sees it
  const response = NextResponse.next({ request });

  // Also set it on the outgoing response so the browser stores the new cookie
  writeResponseSessionCookie(encodedSessionToken, response.cookies);

  return response;
}
