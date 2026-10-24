import { NextResponse } from "next/server";
import { students, Student } from "@/lib/data";

export async function GET() {
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newStudent: Student = {
    id: Date.now(),
    name: body.name ?? "Unnamed",
    age: body.age ?? 0,
  };
  students.push(newStudent);
  return NextResponse.json(newStudent, { status: 201 });
}
