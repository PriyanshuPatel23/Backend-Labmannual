import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const taskId = Number(id);
  if (!Number.isSafeInteger(taskId) || taskId < 1) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  const task = await prisma.task.findUnique({
    where: { TaskID: taskId },
  });

  if (!task) return new NextResponse("Task not found", { status: 404 });
  return NextResponse.json(task);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const taskId = Number(id);

  if (!/^[1-9]\d*$/.test(id)) {
    return NextResponse.json(
      { message: "Invalid TaskID" },
      { status: 400 }
    );
  }

  try {
    const deletedTask = await prisma.task.delete({
      where: {
        TaskID: taskId,
      },
    });

    return NextResponse.json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    );
  }
}