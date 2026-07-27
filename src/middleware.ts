import { NextRequest, NextResponse } from "next/server";
import { isHealthyApi } from "./api/apiServerMisc";
import { sessionHandlerMiddleware } from "./middlewares/sessionHandlerMiddleware";

export const runtime = "nodejs";

// let isServerAction = false;

export async function middleware(request: NextRequest) {
  const isHealthy = await isHealthyApi();

  // move on and display fail handling view
  if (!isHealthy) {
    return NextResponse.next();
  }

  // Skip static and auth paths
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname === "/favicon.ico" ||
    request.nextUrl.pathname === "/login" // Add login page to public paths
  ) {
    return NextResponse.next();
  }

  const response = await sessionHandlerMiddleware(request);

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
