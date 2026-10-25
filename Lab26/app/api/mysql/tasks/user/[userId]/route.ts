import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/mysql";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const conn = await mysqlPool.getConnection();
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM tasks WHERE UserID = ?",
      [userId]
    );
    return NextResponse.json(rows);
  } finally {
    conn.release();
  }
}
