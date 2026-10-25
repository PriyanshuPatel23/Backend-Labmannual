import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    request.nextUrl.pathname === "/records" &&
    !request.nextUrl.searchParams.has("pageNo")
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.set("pageNo", "0");
    return NextResponse.redirect(url);
  }

  const accessToken = request.cookies.get("access_token")?.value;

  const refreshToken = request.cookies.get("refresh_token")?.value;

  const loginUrl = new URL("/login", request.url);

  if (!accessToken) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    await jwtVerify(accessToken, secret);

    return NextResponse.next();
  } catch {
    console.log("Error: Encountered")
  }

  if (!refreshToken) {
    return NextResponse.redirect(loginUrl);
  }

  const AuthRefreshUrl = process.env.AUTH_REFRESH_URL;

  if (!AuthRefreshUrl) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const refreshResponse = await fetch(AuthRefreshUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!refreshResponse.ok) {
      return NextResponse.redirect(loginUrl);
    }

    const data = await refreshResponse.json();

    if (!data.accessToken) {
      return NextResponse.redirect(loginUrl);
    }

    // Verify the newly issued token before accepting it.
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    await jwtVerify(data.accessToken, secret);

    const response = NextResponse.next();

    response.cookies.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/records",
    "/profile/:path*",
  ],
};
