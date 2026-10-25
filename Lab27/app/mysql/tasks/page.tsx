import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "MySQL Tasks" };

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;
  const query = search.trim();
  const tasks = await prisma.task.findMany({
    where: query ? { TaskTitle: { contains: query } } : undefined,
    orderBy: { TaskID: "asc" },
  });

  return (
    <main style={{ padding: "1rem" }}>
      <h1>MySQL Tasks</h1>
      <form action="/mysql/tasks" method="get">
        <label htmlFor="search">Search by task title: </label>
        <input id="search" name="search" defaultValue={search} />
        <button type="submit">Search</button>
        {query && (
          <Link href="/mysql/tasks" style={{ marginLeft: "0.5rem" }}>
            Clear
          </Link>
        )}
      </form>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.TaskID}>
              <Link href={`/mysql/tasks/${task.TaskID}`}>
                {task.TaskTitle}
              </Link>
              {" · "}
              <Link href={`/mysql/tasks/user/${task.UserID}`}>
                User {task.UserID}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p>
        <Link href="/">Back to Lab 27</Link>
      </p>
    </main>
  );
}
