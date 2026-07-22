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

// Check if token needs refresh (using milliseconds)
export function shouldRefreshToken(token: JWT): boolean {
  const now = Date.now(); // milliseconds
  const expiresAt = token.expiresAt; // milliseconds
  const refreshThreshold = TOKEN_REFRESH_BUFFER * 1000; // convert to milliseconds

  // Refresh if expired or within buffer time
  return now >= expiresAt - refreshThreshold;
}

function updateCookie(sessionToken: string | null, cookieStore: CookieStore) {
  if (sessionToken) {
    for (const cookie of cookieStore.getAll()) {
      if (cookie.name.startsWith(SESSION_COOKIE)) {
        cookieStore.delete(cookie.name);
      }
    }

    const size = 3933; // maximum size of each chunk
    const regex = new RegExp(".{1," + size + "}", "g");

    // split the string into an array of strings
    const tokenChunks = sessionToken.match(regex);

    if (tokenChunks) {
      // chunk the token as auth.js do it
      if (tokenChunks.length > 1) {
        tokenChunks.forEach((tokenChunk, index) => {
          cookieStore.set(`${SESSION_COOKIE}.${index}`, tokenChunk, {
            httpOnly: true,
            maxAge: SESSION_TIMEOUT,
            secure: SESSION_SECURE,
            sameSite: "lax",
            path: "/",
          });
        });
      } else {
        cookieStore.set(SESSION_COOKIE, sessionToken, {
          httpOnly: true,
          maxAge: SESSION_TIMEOUT,
          secure: SESSION_SECURE,
          sameSite: "lax",
          path: "/",
        });
      }
    }
  } else {
    cookieStore.delete(SESSION_COOKIE);
  }

  return cookieStore;
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
        expiresAt: expiresAtMs, // milliseconds
        refreshedAt: Date.now(), // milliseconds
      };
    }

    console.error("Refresh token failed:", result.statusCode, result.data);
    return null;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}

export async function updateCookieSessionIfNeeded(
  token: JWT,
  cookieStore: CookieStore,
) {
  const needsRefresh = shouldRefreshToken(token);
  if (needsRefresh) {
    const newToken = await refreshAccessToken(token);

    if (!newToken) {
      updateCookie(null, cookieStore);
      return null;
    }

    const newSessionToken = await encode({
      secret: process.env.AUTH_SECRET!,
      token: newToken,
      maxAge: SESSION_TIMEOUT,
      salt: SESSION_COOKIE,
    });

    updateCookie(newSessionToken, cookieStore);

    return newToken;
  }

  return token;
}
