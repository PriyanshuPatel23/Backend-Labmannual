import { NextResponse } from "next/server";
import { students, Student } from "@/lib/data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const student = students.find((s) => s.id === id);
  if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(student);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await request.json();
  const updated: Student = { ...students[index], ...body, id };
  students[index] = updated;
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const [removed] = students.splice(index, 1);
  return NextResponse.json(removed);
}
