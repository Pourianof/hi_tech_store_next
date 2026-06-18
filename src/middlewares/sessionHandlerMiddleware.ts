import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "../lib/auth/sessionConsts";
import { updateCookieSessionIfNeeded } from "../lib/auth/sessionMaintainer";

export async function sessionHandlerMiddleware(
  request: NextRequest,
  response: NextResponse,
) {
  const token = await getToken({
    secret: process.env.AUTH_SECRET,
    req: request,
    cookieName: SESSION_COOKIE,
  });

  // No token - redirect to login
  if (!token) {
    return NextResponse.next();
  }

  //   if (isServerAction) console.debug("NEED FOR REFRESH?: ", needsRefresh);

  await updateCookieSessionIfNeeded(token, response.cookies);

  // Always return the response (either updated or original)
  return NextResponse.next(response);
}
