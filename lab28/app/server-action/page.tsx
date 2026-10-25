export default function ServerActionPage() {
  async function greetUser(formData: FormData) {
    "use server";

    const name = formData.get("name");

    console.log("Hello, " + name);
  }

  return (
    <div>
      <h1>Server Action Demonstration</h1>

      <form action={greetUser}>
        <label htmlFor="name">Enter your name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}