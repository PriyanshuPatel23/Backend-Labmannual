import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { TaskTitle, TaskDescription, IsCompleted, UserID } =
      await request.json();

    if (!TaskTitle || !TaskDescription || !Number.isInteger(Number(UserID))) {
      return NextResponse.json(
        { message: "Valid task details and UserID are required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        TaskTitle,
        TaskDescription,
        IsCompleted: Boolean(IsCompleted),
        UserID: Number(UserID)
      }
    });

    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unable to add task. Check whether the user exists." },
      { status: 400 }
    );
  }
}