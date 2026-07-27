import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "../lib/auth/sessionConsts";
import {
  getRefreshedToken,
  writeSessionCookie,
  writeResponseSessionCookie,
  clearSessionCookie,
  getExistingSessionCookieNames,
  deleteSessionCookiesByName,
  RefreshOutcomeKind,
} from "../lib/auth/sessionMaintainer";

const LOGIN_PATH = "/login";

// Kept as constants (not inline strings) since the /login page needs to read
// these exact same query param names/values to show the right message.
export const LOGOUT_QUERY_PARAM = {
  CallbackUrl: "callbackUrl",
  Reason: "reason",
} as const;

export const LogoutReason = {
  SessionExpired: "session-expired",
} as const;

// A "page navigation" is a top-level document request from the browser
// (typing a URL, clicking a link, refreshing a page) - as opposed to a
// fetch()/XHR from client components, a Server Action POST, an <img> request,
// prefetches, etc. Only for navigations is a hard redirect safe/correct.
function isPageNavigation(request: NextRequest): boolean {
  const dest = request.headers.get("sec-fetch-dest");
  if (dest) return dest === "document";

  // Fallback for browsers/environments without Sec-Fetch-* headers
  const accept = request.headers.get("accept") ?? "";
  return accept.includes("text/html");
}

function buildLogoutResponse(request: NextRequest): NextResponse {
  // Must capture this BEFORE mutating request.cookies - it's the only
  // accurate source of what cookies actually exist in the browser.
  const existingCookieNames = getExistingSessionCookieNames(request.cookies);

  clearSessionCookie(request.cookies);

  if (isPageNavigation(request)) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set(
      LOGOUT_QUERY_PARAM.CallbackUrl,
      request.nextUrl.pathname + request.nextUrl.search,
    );
    loginUrl.searchParams.set(
      LOGOUT_QUERY_PARAM.Reason,
      LogoutReason.SessionExpired,
    );

    const response = NextResponse.redirect(loginUrl);
    // IMPORTANT: response.cookies.getAll() is always empty here (it only
    // reflects cookies explicitly set on THIS response, not the browser's
    // real cookies) - so we delete the exact names captured above instead
    // of scanning response.cookies. This was the actual bug: nothing was
    // ever being cleared from the response, so the browser kept the old
    // chunked cookie forever, causing an infinite redirect-to-login loop.
    deleteSessionCookiesByName(existingCookieNames, response.cookies);
    return response;
  }

  // Not a page navigation (fetch/server action/asset/etc.) - a redirect here
  // would either be ignored or break the caller. Just clear the cookie and
  // let the request continue; it will hit the API without a valid token and
  // get its own 401, which the client-side fetch layer / error boundary can
  // turn into a redirect to /login.
  const response = NextResponse.next({ request });
  deleteSessionCookiesByName(existingCookieNames, response.cookies);
  return response;
}

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

  const outcome = await getRefreshedToken(token);

  switch (outcome.kind) {
    case RefreshOutcomeKind.NotNeeded:
      return NextResponse.next();

    case RefreshOutcomeKind.TransientFailure:
      // Keep the old (still technically valid for a bit, or at least not
      // provably dead) session and just continue. Don't force a logout on
      // a network blip or a temporary 5xx from the refresh endpoint.
      return NextResponse.next();

    case RefreshOutcomeKind.LogoutRequired:
      // Refresh token was rejected (401) by the API - it's genuinely dead.
      return buildLogoutResponse(request);

    case RefreshOutcomeKind.Refreshed: {
      // Capture the real existing chunk names BEFORE writeSessionCookie
      // overwrites request.cookies - needed to clean up any stale chunks
      // on the response (e.g. old token had 3 chunks, new one only needs 2).
      const existingCookieNames = getExistingSessionCookieNames(
        request.cookies,
      );

      // Propagate to request.cookies FIRST so Server Components / Server
      // Actions running later in this same request see the fresh token.
      writeSessionCookie(outcome.encodedSessionToken, request.cookies);

      const response = NextResponse.next({ request });
      writeResponseSessionCookie(
        outcome.encodedSessionToken,
        response.cookies,
        existingCookieNames,
      );

      return response;
    }
  }
}
