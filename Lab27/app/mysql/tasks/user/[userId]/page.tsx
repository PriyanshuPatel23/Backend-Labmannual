import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "User Tasks" };

export default async function UserTasksPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId: rawUserId } = await params;
  const userId = Number(rawUserId);
  if (!Number.isSafeInteger(userId) || userId < 1) notFound();

  const user = await prisma.user.findUnique({
    where: { UserID: userId },
    select: { UserID: true, UserName: true },
  });
  if (!user) notFound();

  const tasks = await prisma.task.findMany({
    where: { UserID: userId },
    orderBy: { TaskID: "asc" },
  });

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Tasks for {user.UserName}</h1>
      {tasks.length === 0 ? (
        <p>This user has no tasks.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.TaskID}>
              <Link href={`/mysql/tasks/${task.TaskID}`}>
                {task.TaskTitle}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href="/mysql/tasks">← Back to all tasks</Link>
    </main>
  );
}
