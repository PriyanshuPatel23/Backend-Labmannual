import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "Task Detail" };

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taskId = Number(id);
  if (!Number.isSafeInteger(taskId) || taskId < 1) notFound();

  const task = await prisma.task.findUnique({
    where: { TaskID: taskId },
  });
  if (!task) notFound();

  return (
    <main style={{ padding: "1rem" }}>
      <h1>{task.TaskTitle}</h1>
      <p>{task.TaskDescription}</p>
      <p>Completed: {task.IsCompleted ? "Yes" : "No"}</p>
      <p>
        <Link href={`/mysql/tasks/user/${task.UserID}`}>
          View tasks for user {task.UserID}
        </Link>
      </p>
      <Link href="/mysql/tasks">← Back to tasks</Link>
    </main>
  );
}
