import Link from "next/link";

export default function Home() {
  return (
    <main style={{ margin: "0 auto", maxWidth: 720, padding: "2rem 1rem" }}>
      <h1>Lab 27: Prisma ORM with MySQL</h1>
      <p>
        Browse users and tasks, search records, and view the tasks assigned to a
        user.
      </p>
      <ul>
        <li>
          <Link href="/mysql/users">View and search users</Link>
        </li>
        <li>
          <Link href="/mysql/tasks">View and search tasks</Link>
        </li>
      </ul>
    </main>
  );
}
