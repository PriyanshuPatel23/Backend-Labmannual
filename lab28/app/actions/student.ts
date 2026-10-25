"use server";

export async function addStudent(formData: FormData) {
  const name = formData.get("name");
  const course = formData.get("course");

  console.log("Student Added");
  console.log("Name:", name);
  console.log("Course:", course);
}