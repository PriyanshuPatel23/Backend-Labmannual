import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/students")) {
    console.log(`[INTERCEPT] ${request.method} ${request.nextUrl.pathname}`);
    const response = NextResponse.next();
    response.headers.set("x-intercepted", "true");
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
