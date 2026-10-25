import { NextResponse } from "next/server"
import pool from "../../../lib/db"

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * from students");
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Message", error);
        return NextResponse.json(
            { message: "Failed to fetch students" },
            { status: 500 }
        )
    }
}