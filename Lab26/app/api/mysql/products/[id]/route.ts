import { NextResponse } from "next/server";
import { mysqlPool } from "@/lib/mysql";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const conn = await mysqlPool.getConnection();
  try {
    const [rows] = await conn.execute("SELECT * FROM products WHERE id = ?", [id]);
    const product = (rows as any[])[0];
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return NextResponse.json(product);
  } finally {
    conn.release();
  }
}
