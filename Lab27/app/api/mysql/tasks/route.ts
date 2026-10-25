import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();

  const tasks = await prisma.task.findMany({
    where: search
      ? { TaskTitle: { contains: search } }
      : undefined,
  });

  return NextResponse.json(tasks);
}
