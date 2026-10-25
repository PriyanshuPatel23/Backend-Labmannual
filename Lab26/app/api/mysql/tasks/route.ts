import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/mysql";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const conn = await mysqlPool.getConnection();
  try {
    const [rows] = await (search
      ? conn.execute("SELECT * FROM tasks WHERE TaskTitle LIKE ?", ["%" + search + "%"])
      : conn.execute("SELECT * FROM tasks"));
    return NextResponse.json(rows);
  } finally {
    conn.release();
  }
}
