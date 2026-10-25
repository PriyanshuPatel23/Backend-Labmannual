import { addStudent } from "@/app/actions/student";

export default function SeparateActionPage() {
  return (
    <div>
      <h1>Add Student</h1>

      <form action={addStudent}>
        <label>
          Student Name:
          <input name="name" type="text" required />
        </label>

        <br />

        <label>
          Course:
          <input name="course" type="text" required />
        </label>

        <br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}