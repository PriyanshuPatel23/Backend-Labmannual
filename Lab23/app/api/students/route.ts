import { addStudent, getStudents } from "@/lib/student";

export async function GET() {
  return Response.json(getStudents());
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !Number.isInteger(body.age)) {
    return Response.json(
      { message: "Name and integer age are required" },
      { status: 400 }
    );
  }

  const student = {
    id: Math.max(0, ...getStudents().map((s) => s.id)) + 1,
    name: body.name,
    age: body.age,
  };

  addStudent(student);

  return Response.json(student, { status: 201 });
}