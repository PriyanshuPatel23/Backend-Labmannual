import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "User Detail" };

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  if (!Number.isSafeInteger(userId) || userId < 1) notFound();

  const user = await prisma.user.findUnique({
    where: { UserID: userId },
    select: { UserID: true, UserName: true },
  });
  if (!user) notFound();

  return (
    <main style={{ padding: "1rem" }}>
      <h1>{user.UserName}</h1>
      <p>UserID: {user.UserID}</p>
      <p>
        <Link href={`/mysql/tasks/user/${user.UserID}`}>
          View this user&apos;s tasks
        </Link>
      </p>
      <Link href="/mysql/users">← Back to users</Link>
    </main>
  );
}
