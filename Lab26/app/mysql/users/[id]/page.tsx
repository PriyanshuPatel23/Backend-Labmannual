import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Detail",
};

async function fetchUser(id: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/mysql/users/${id}`);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id);
  return (
    <main style={{ padding: "1rem" }}>
      <h1>{user.UserName}</h1>
      <p>UserID: {user.UserID}</p>
      <a href="/mysql/users">← Back to users</a>
    </main>
  );
}
