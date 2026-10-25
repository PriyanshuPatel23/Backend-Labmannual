import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/mysql";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const conn = await mysqlPool.getConnection();
  try {
    const [rows] = await conn.execute("SELECT UserID, UserName FROM users WHERE UserID = ?", [id]);
    const user = (rows as any[])[0];
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    return NextResponse.json(user);
  } finally {
    conn.release();
  }
}
