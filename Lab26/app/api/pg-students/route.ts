import { NextResponse } from "next/server";
import pool from "@/lib/pgdb";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM students");

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("PostgreSQL error:", error);

    return NextResponse.json(
      { message: "Failed to fetch students" },
      { status: 500 }
    );
  }
}