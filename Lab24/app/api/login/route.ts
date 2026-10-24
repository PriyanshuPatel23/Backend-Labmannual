// app/api/login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const token = formData.get("token")?.toString();
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("token", token, { httpOnly: true, path: "/" });
  return response;
}
