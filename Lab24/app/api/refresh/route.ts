import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const newToken = "new-token";
  return NextResponse.json({ token: newToken });
}
