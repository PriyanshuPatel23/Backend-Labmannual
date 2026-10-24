// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 1️⃣ Default pageNo middleware – ensures a `pageNo` query param exists.
 *    If missing, it rewrites the URL adding `pageNo=0`.
 */
function ensurePageNo(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (!url.searchParams.has("pageNo")) {
    url.searchParams.set("pageNo", "0");
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

/**
 * 2️⃣ Token check middleware – looks for a `token` cookie.
 *    If absent, redirects to the login page.
 */
function requireAuth(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

/**
 * 3️⃣ Token refresh middleware – simple demo that treats the token value
 *    "expired" as an expired JWT. It calls an internal refresh endpoint and
 *    sets the new token as a cookie.
 */
async function refreshIfNeeded(request: NextRequest) {
  const token = request.cookies.get("token");
  // In a real app you would verify the JWT expiration claim.
  if (token?.value === "expired") {
    // Call our internal refresh API (works because it lives in the same app).
    const refreshResp = await fetch(new URL("/api/refresh", request.url).toString(), {
      method: "GET",
      headers: { Cookie: request.headers.get("cookie") ?? "" },
    });
    if (refreshResp.ok) {
      const data = await refreshResp.json();
      const response = NextResponse.next();
      response.cookies.set("token", data.token, { httpOnly: true, path: "/" });
      return response;
    }
  }
  return NextResponse.next();
}

/**
 * The exported middleware runs the three checks in order.
 * It uses matcher patterns so the logic only runs where appropriate.
 */
export async function middleware(request: NextRequest) {
  // Apply pageNo default for any route that expects pagination.
  const pageNoResult = ensurePageNo(request);
  if (pageNoResult !== NextResponse.next()) return pageNoResult;

  // Protect all routes except the login page and static assets.
  const authResult = requireAuth(request);
  if (authResult !== NextResponse.next()) return authResult;

  // Finally, attempt token refresh if needed.
  return await refreshIfNeeded(request);
}

/**
 * Apply middleware to relevant paths.
 * - Pagination pages: any route under /pages/* (example) – demonstrated with **
 * - Auth protection: all routes except /login and /api/refresh
 */
export const config = {
  matcher: [
    "/((?!login|api\/refresh).*)", // all routes except login and the refresh endpoint
  ],
};
