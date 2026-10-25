
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params;
  const TaskID = Number(id);

  if (!Number.isInteger(TaskID) || TaskID < 1) {
    return NextResponse.json({ message: "Invalid TaskID" }, { status: 400 });
  }

  try {
    const { TaskTitle, TaskDescription, IsCompleted } =
      await request.json();

    if (!TaskTitle || !TaskDescription ||
        typeof IsCompleted !== "boolean") {
      return NextResponse.json(
        { message: "All task fields are required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.update({
      where: { TaskID },
      data: { TaskTitle, TaskDescription, IsCompleted }
    });

    return NextResponse.json(task);
  } catch {
    return NextResponse.json(
      { message: "Task not found or update failed" },
      { status: 404 }
    );
  }
}
