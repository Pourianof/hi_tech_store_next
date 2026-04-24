import { NextResponse, type NextRequest } from "next/server";
import { getToken, encode, type JWT } from "next-auth/jwt";
import { refreshTheTokenApi } from "@/api/authApi";
import { encryptHelper } from "@/lib/utils/encryptor";
import { isHealthyApi } from "./api/apiServerMisc";

export const runtime = "nodejs";

const SESSION_SECURE = process.env.NEXTAUTH_URL?.startsWith("https://");
const SESSION_COOKIE = SESSION_SECURE
  ? "__Secure-next-auth.session-token"
  : "authjs.session-token";

const SESSION_TIMEOUT = 30 * 24 * 60 * 60; // 30 days
const TOKEN_REFRESH_BUFFER = 5 * 60; // 5 minutes buffer before expiration

// Check if token needs refresh (using milliseconds)
function shouldRefreshToken(token: JWT): boolean {
  const now = Date.now(); // milliseconds
  const expiresAt = token.expiresAt; // milliseconds
  const refreshThreshold = TOKEN_REFRESH_BUFFER * 1000; // convert to milliseconds

  // Refresh if expired or within buffer time
  return now >= expiresAt - refreshThreshold;
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

function updateCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  if (sessionToken) {
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      maxAge: SESSION_TIMEOUT,
      secure: SESSION_SECURE,
      sameSite: "lax",
      path: "/",
    });
  } else {
    response.cookies.delete(SESSION_COOKIE);
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const isHealthy = await isHealthyApi();

  // move on and display fail handling view
  if (!isHealthy) {
    return NextResponse.next();
  }

  // Skip static and auth paths
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api/auth") ||
    request.nextUrl.pathname === "/favicon.ico" ||
    request.nextUrl.pathname === "/login" // Add login page to public paths
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    secret: process.env.AUTH_SECRET,
    req: request,
    salt: SESSION_COOKIE,
  });

  // No token - redirect to login
  if (!token) {
    return NextResponse.next();
  }

  const needsRefresh = shouldRefreshToken(token);

  let response = NextResponse.next();

  if (needsRefresh) {
    const newToken = await refreshAccessToken(token);

    if (!newToken) {
      response = updateCookie(null, request, response);
      // Optionally redirect to login
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const newSessionToken = await encode({
      secret: process.env.AUTH_SECRET!,
      token: newToken,
      maxAge: SESSION_TIMEOUT,
      salt: SESSION_COOKIE,
    });

    response = updateCookie(newSessionToken, request, response);
  }

  // Always return the response (either updated or original)
  return response;
}

// Optional: Specify which paths trigger middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
