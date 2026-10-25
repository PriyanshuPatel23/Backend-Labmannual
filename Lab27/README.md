# Lab 27: Prisma ORM with MySQL

This application demonstrates Prisma Client queries against MySQL for users and
tasks. The Prisma schema and initial migration are in `prisma/`.

## Requirements

- Node.js 20.9 or later
- MySQL 8 or a compatible MySQL server

## Setup

Run these commands from the `Lab27` directory:

```powershell
npm install
Copy-Item .env.example .env
```

Set `DATABASE_URL` in `.env` to your MySQL connection string. Create the
database first if it does not already exist, for example:

```sql
CREATE DATABASE lab27;
```

Then generate Prisma Client, apply the migration, and insert sample records:

```powershell
npm run gen
npm run db:migrate
npm run db:seed
npm run dev
```

Open <http://localhost:3000>. The seed inserts two users and three tasks. Its
password values are placeholders for this database demonstration, not usable
credentials. Do not use this sample as an authentication implementation.

## Prisma methods demonstrated

- `findMany()` retrieves all users or tasks.
- `findUnique()` retrieves one record by its primary key.
- `contains` filters user names or task titles for search.
- `findMany({ where: { UserID } })` retrieves all tasks belonging to a user.
- `create()` and `createMany()` insert the seed users and tasks.
- The `User` / `Task` relation in `prisma/schema.prisma` models the foreign key.

The initial MySQL migration uses a case-insensitive `utf8mb4_unicode_ci`
collation, so the substring searches follow the database collation.

## Pages

- `/mysql/users` lists users and searches by name.
- `/mysql/users/:id` displays a user's public details.
- `/mysql/tasks` lists tasks and searches by title.
- `/mysql/tasks/:id` displays a task.
- `/mysql/tasks/user/:userId` lists tasks for a user.

The matching JSON endpoints are:

| Operation | Endpoint |
| --- | --- |
| Get all users / search users | `GET /api/mysql/users?search=...` |
| Get user by ID | `GET /api/mysql/users/:id` |
| Get all tasks / search tasks | `GET /api/mysql/tasks?search=...` |
| Get task by ID | `GET /api/mysql/tasks/:id` |
| Get tasks by user ID | `GET /api/mysql/tasks/user/:userId` |

For Prisma's interactive database browser, run `npm run db:studio`.
