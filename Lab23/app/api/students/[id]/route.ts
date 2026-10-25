import { deleteStudent, getStudentById, updateStudent } from "@/lib/student";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const { id } = await params;
  const student = getStudentById(Number(id));

  if (!student) {
    return Response.json({ message: "Student not found" }, { status: 404 });
  }

  return Response.json(student);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } },
) {
  const { id } = await params;
  const body = await request.json();

  if (!body.name || !Number.isInteger(body.age) || body.age < 1) {
    return Response.json(
      { message: "Valid name and age are required" },
      { status: 400 },
    );
  }

  const student = updateStudent(Number(id), {
    name: body.name,
    age: body.age,
  });

  if (!student) {
    return Response.json({ message: "Student not found" }, { status: 404 });
  }

  return Response.json(student);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const { id } = await params;
  const deleted = deleteStudent(Number(id));

  if (!deleted) {
    return Response.json({ message: "Student not found" }, { status: 404 });
  }

  return Response.json({
    message: "Student deleted successfully",
  });
}
