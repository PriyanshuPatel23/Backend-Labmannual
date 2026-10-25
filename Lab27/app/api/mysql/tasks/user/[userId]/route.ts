import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId: rawUserId } = await params;
  const userId = Number(rawUserId);
  if (!Number.isSafeInteger(userId) || userId < 1) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const tasks = await prisma.task.findMany({
    where: { UserID: userId },
  });

  return NextResponse.json(tasks);
}
