export default function PrintFormPage() {
  async function printFormData(formData: FormData) {
    "use server";

    console.log("Form Data Submitted:");

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  }

  return (
    <div>
      <h1>Print Form Data</h1>

      <form action={printFormData}>
        <label>
          Name:
          <input name="name" type="text" required />
        </label>

        <br />

        <label>
          Email:
          <input name="email" type="email" required />
        </label>

        <br />

        <label>
          Age:
          <input name="age" type="number" required />
        </label>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}