import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "MySQL Users" };

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;
  const query = search.trim();
  const users = await prisma.user.findMany({
    where: query ? { UserName: { contains: query } } : undefined,
    select: { UserID: true, UserName: true },
    orderBy: { UserID: "asc" },
  });

  return (
    <main style={{ padding: "1rem" }}>
      <h1>MySQL Users</h1>
      <form action="/mysql/users" method="get">
        <label htmlFor="search">Search by user name: </label>
        <input id="search" name="search" defaultValue={search} />
        <button type="submit">Search</button>
        {query && (
          <Link href="/mysql/users" style={{ marginLeft: "0.5rem" }}>
            Clear
          </Link>
        )}
      </form>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.UserID}>
              <Link href={`/mysql/users/${user.UserID}`}>{user.UserName}</Link>
              {" · "}
              <Link href={`/mysql/tasks/user/${user.UserID}`}>View tasks</Link>
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
