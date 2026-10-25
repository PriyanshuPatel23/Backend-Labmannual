import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MySQL Users",
};

async function fetchUsers(search?: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/mysql/users`);
  if (search) url.searchParams.set("search", search);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function UsersPage() {
  const users = await fetchUsers();
  return (
    <main style={{ padding: "1rem" }}>
      <h1>MySQL Users</h1>
      <ul>
        {users.map((u: any) => (
          <li key={u.UserID}>
            <a href={`/mysql/users/${u.UserID}`}>{u.UserName}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
