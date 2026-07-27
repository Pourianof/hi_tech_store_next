import { encode, type JWT } from "next-auth/jwt";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { encryptHelper } from "../utils/encryptor";
import { refreshTheTokenApi } from "@/api/authApi";
import {
  TOKEN_REFRESH_BUFFER,
  SESSION_COOKIE,
  SESSION_TIMEOUT,
  SESSION_SECURE,
} from "./sessionConsts";

export type CookieStore = Pick<
  ReadonlyRequestCookies,
  "get" | "has" | "set" | "delete" | "getAll"
>;

// Minimal shape both NextRequest["cookies"] and NextResponse["cookies"] satisfy
export type MinimalCookieStore = {
  getAll: () => { name: string }[];
  delete: (name: string) => unknown;
  set: (name: string, value: string) => unknown;
};

export function shouldRefreshToken(token: JWT): boolean {
  const now = Date.now();
  const expiresAt = token.expiresAt;
  const refreshThreshold = TOKEN_REFRESH_BUFFER * 1000;
  return now >= expiresAt - refreshThreshold;
}

// Clears any chunked/base session cookie from a given store (request or response)
export function clearSessionCookie(cookieStore: MinimalCookieStore) {
  for (const cookie of cookieStore.getAll()) {
    if (cookie.name.startsWith(SESSION_COOKIE)) {
      cookieStore.delete(cookie.name);
    }
  }
}

// response.cookies.getAll() only reflects cookies explicitly set on that
// specific response object - it is NOT a view of the browser's actual
// cookies. So clearing a session from a response requires knowing the real
// cookie names in advance. Read them from request.cookies (which DOES parse
// the real incoming Cookie header) before anything else mutates it.
export function getExistingSessionCookieNames(
  cookieStore: MinimalCookieStore,
): string[] {
  return cookieStore
    .getAll()
    .map((c) => c.name)
    .filter((name) => name.startsWith(SESSION_COOKIE));
}

// Deletes an explicit list of cookie names from a store. Use this for
// response.cookies together with getExistingSessionCookieNames(request.cookies)
// captured beforehand - do NOT rely on response.cookies.getAll() for this.
export function deleteSessionCookiesByName(
  names: string[],
  cookieStore: MinimalCookieStore,
) {
  for (const name of names) {
    cookieStore.delete(name);
  }
}

// Writes the (possibly chunked) encoded session token into a cookie store.
// Works for both request.cookies (name/value only) and response.cookies
// (which additionally gets httpOnly/secure/etc. options applied by the caller).
export function writeSessionCookie(
  sessionToken: string,
  cookieStore: MinimalCookieStore,
) {
  clearSessionCookie(cookieStore);

  const size = 3933; // maximum size of each chunk
  const regex = new RegExp(".{1," + size + "}", "g");
  const tokenChunks = sessionToken.match(regex);

  if (!tokenChunks) return;

  if (tokenChunks.length > 1) {
    tokenChunks.forEach((tokenChunk, index) => {
      cookieStore.set(`${SESSION_COOKIE}.${index}`, tokenChunk);
    });
  } else {
    cookieStore.set(SESSION_COOKIE, sessionToken);
  }
}

// Same as writeSessionCookie, but for response.cookies which supports full
// cookie options (httpOnly, secure, sameSite, maxAge, path).
// `existingCookieNames` must come from getExistingSessionCookieNames(request.cookies)
// captured BEFORE this call - response.cookies.getAll() does not reflect the
// browser's real cookies, so it can't be used to find stale chunks to clean up.
export function writeResponseSessionCookie(
  sessionToken: string,
  cookieStore: CookieStore,
  existingCookieNames: string[],
) {
  for (const name of existingCookieNames) {
    cookieStore.delete(name);
  }

  const size = 3933;
  const regex = new RegExp(".{1," + size + "}", "g");
  const tokenChunks = sessionToken.match(regex);

  if (!tokenChunks) return;

  const options = {
    httpOnly: true,
    maxAge: SESSION_TIMEOUT,
    secure: SESSION_SECURE,
    sameSite: "lax" as const,
    path: "/",
  };

  if (tokenChunks.length > 1) {
    tokenChunks.forEach((tokenChunk, index) => {
      cookieStore.set(`${SESSION_COOKIE}.${index}`, tokenChunk, options);
    });
  } else {
    cookieStore.set(SESSION_COOKIE, sessionToken, options);
  }
}

// Distinguishes "refresh token is genuinely invalid/expired" (-> must log the
// user out) from transient/network failures (-> safer to keep the old
// session and let the user retry, rather than force a logout on a blip).
export class RefreshTokenInvalidError extends Error {}

async function refreshAccessToken(token: JWT): Promise<JWT | null> {
  const refToken = await encryptHelper.decrypt(token.refToken);
  const result = await refreshTheTokenApi(refToken);

  if (result.status === "success") {
    const expiresAtMs = new Date(result.data.expiresAt).getTime();

    return {
      ...token,
      apiToken: result.data.token,
      expiresAt: expiresAtMs,
      refreshedAt: Date.now(),
    };
  }

  console.error("Refresh token failed:", result.statusCode, result.data);

  // 401 from the refresh endpoint means the refresh token itself is
  // rejected (expired / revoked / already used) - not a transient error.
  if (result.statusCode === 401) {
    throw new RefreshTokenInvalidError();
  }

  // Any other failure (network error, 5xx, etc.) - don't force a logout,
  // just report it so the caller can decide (e.g. keep old session, retry
  // on next request).
  return null;
}

// String constants for the possible refresh outcomes, defined once here so
// call sites (middleware, tests, etc.) never repeat/mistype raw string
// literals - use RefreshOutcomeKind.Refreshed etc. instead of "refreshed".
export const RefreshOutcomeKind = {
  NotNeeded: "not-needed",
  Refreshed: "refreshed",
  LogoutRequired: "logout-required",
  TransientFailure: "transient-failure",
} as const;

export type RefreshOutcomeKind =
  (typeof RefreshOutcomeKind)[keyof typeof RefreshOutcomeKind];

export type RefreshOutcome =
  | { kind: typeof RefreshOutcomeKind.NotNeeded; token: JWT }
  | {
      kind: typeof RefreshOutcomeKind.Refreshed;
      token: JWT;
      encodedSessionToken: string;
    }
  // Refresh token is genuinely invalid -> must force logout
  | { kind: typeof RefreshOutcomeKind.LogoutRequired }
  // Transient failure (network/5xx) -> keep the old session, don't log out
  | { kind: typeof RefreshOutcomeKind.TransientFailure; token: JWT };

export async function getRefreshedToken(token: JWT): Promise<RefreshOutcome> {
  if (!shouldRefreshToken(token)) {
    return { kind: RefreshOutcomeKind.NotNeeded, token };
  }

  let newToken: JWT | null;
  try {
    newToken = await refreshAccessToken(token);
  } catch (error) {
    if (error instanceof RefreshTokenInvalidError) {
      return { kind: RefreshOutcomeKind.LogoutRequired };
    }
    console.error("Unexpected error during token refresh:", error);
    return { kind: RefreshOutcomeKind.TransientFailure, token };
  }

  if (!newToken) {
    // refreshAccessToken returned null for a non-401 failure
    return { kind: RefreshOutcomeKind.TransientFailure, token };
  }

  const newSessionToken = await encode({
    secret: process.env.AUTH_SECRET!,
    token: newToken,
    maxAge: SESSION_TIMEOUT,
    salt: SESSION_COOKIE,
  });

  return {
    kind: RefreshOutcomeKind.Refreshed,
    token: newToken,
    encodedSessionToken: newSessionToken,
  };
}
