"use server";

export type FormState = {
  message: string;
  errors: {
    name?: string;
    email?: string;
    age?: string;
  };
};

export async function validateStudent(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const ageValue = String(formData.get("age") ?? "");

  const errors: FormState["errors"] = {};

  if (name.length < 3) {
    errors.name = "Name must contain at least 3 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const age = Number(ageValue);

  if (
    ageValue.trim() === "" ||
    !Number.isInteger(age) ||
    age < 18 ||
    age > 60
  ) {
    errors.age = "Age must be between 18 and 60.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "Please correct the errors below.",
      errors,
    };
  }

  console.log("Validated Student:", { name, email, age });

  return {
    message: "Student form submitted successfully!",
    errors: {},
  };
}