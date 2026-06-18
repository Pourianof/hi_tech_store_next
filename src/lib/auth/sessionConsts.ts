export const TOKEN_REFRESH_BUFFER = 5 * 60; // 5 minutes buffer before expiration

export const SESSION_SECURE = process.env.NEXTAUTH_URL?.startsWith("https://");
export const SESSION_COOKIE = SESSION_SECURE
  ? "__Secure-authjs.session-token"
  : "authjs.session-token";

export const SESSION_TIMEOUT = 30 * 24 * 60 * 60; // 30 days
