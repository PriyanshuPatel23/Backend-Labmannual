import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = Number(id);
  if (!Number.isSafeInteger(userId) || userId < 1) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { UserID: userId },
    select: { UserID: true, UserName: true },
  });

  if (!user) return new NextResponse("User not found", { status: 404 });
  return NextResponse.json(user);
}
