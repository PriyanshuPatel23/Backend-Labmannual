let students = [
  { id: 1, name: "Priyanshu", age: 20 },
  { id: 2, name: "Priya", age: 21 },
  { id: 3, name: "Rahul", age: 22 },
];

export type student = {
  id: number;
  name: string;
  age: number;
};

export function getStudents() {
  return students;
}

export function getStudentById(id: number) {
  return students.find((student) => student.id === id);
}

export function addStudent(student : student) {
  students.push(student);
  return student;
}

export function updateStudent(id : number, data: Partial<student>) {
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) return null;

  students[index] = { ...students[index], ...data, id };
  return students[index];
}

export function deleteStudent(id:number) {
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) return false;

  students.splice(index, 1);
  return true;
}
