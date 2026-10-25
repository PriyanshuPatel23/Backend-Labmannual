import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/mysql";

// GET /api/mysql/users?search=term -> list all users or filter by username (case‑insensitive)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const conn = await mysqlPool.getConnection();
  try {
    const [rows] = await (search
      ? conn.execute("SELECT UserID, UserName FROM users WHERE UserName LIKE ?", ["%" + search + "%"])
      : conn.execute("SELECT UserID, UserName FROM users"));
    return NextResponse.json(rows);
  } finally {
    conn.release();
  }
}
