import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      UserName: "Priyanshu",
      Password: "demo_hash_1",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      UserName: "Rahul",
      Password: "demo_hash_2",
    },
  });

  await prisma.task.createMany({
    data: [
      {
        TaskTitle: "Learn Prisma",
        TaskDescription: "Understand ORM basics",
        IsCompleted: false,
        UserID: user1.UserID,
      },
      {
        TaskTitle: "Complete Lab 27",
        TaskDescription: "Complete the practical",
        IsCompleted: true,
        UserID: user1.UserID,
      },
      {
        TaskTitle: "Learn Next.js",
        TaskDescription: "Practice API routes",
        IsCompleted: false,
        UserID: user2.UserID,
      },
    ],
  });

  console.log("Sample users and tasks created successfully!");
}

main()
  .catch((error: unknown) => {
    console.error("Failed to seed the database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });