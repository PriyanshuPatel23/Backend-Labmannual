import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();

  const users = await prisma.user.findMany({
    where: search
      ? { UserName: { contains: search } }
      : undefined,
    select: { UserID: true, UserName: true },
  });

  return NextResponse.json(users);
}
