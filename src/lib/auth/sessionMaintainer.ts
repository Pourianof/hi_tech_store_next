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

// Writes the (possibly chunked) encoded session token into a cookie store.
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
export function writeResponseSessionCookie(
  sessionToken: string,
  cookieStore: CookieStore,
) {
  for (const cookie of cookieStore.getAll()) {
    if (cookie.name.startsWith(SESSION_COOKIE)) {
      cookieStore.delete(cookie.name);
    }
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

async function refreshAccessToken(token: JWT): Promise<JWT | null> {
  try {
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
    return null;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}

// Returns:
// - { token, encodedSessionToken: null } if no refresh was needed (token unchanged)
// - { token: newToken, encodedSessionToken } if refreshed successfully
// - { token: null, encodedSessionToken: null } if refresh failed (caller should clear cookies / redirect to login)
export async function getRefreshedToken(token: JWT): Promise<{
  token: JWT | null;
  encodedSessionToken: string | null;
  refreshed: boolean;
}> {
  if (!shouldRefreshToken(token)) {
    return { token, encodedSessionToken: null, refreshed: false };
  }

  const newToken = await refreshAccessToken(token);

  if (!newToken) {
    return { token: null, encodedSessionToken: null, refreshed: true };
  }

  const newSessionToken = await encode({
    secret: process.env.AUTH_SECRET!,
    token: newToken,
    maxAge: SESSION_TIMEOUT,
    salt: SESSION_COOKIE,
  });

  return {
    token: newToken,
    encodedSessionToken: newSessionToken,
    refreshed: true,
  };
}
