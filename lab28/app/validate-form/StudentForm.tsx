"use client";

import { useActionState } from "react";
import {
  validateStudent,
  type FormState,
} from "@/app/actions/validate-student";

const initialState: FormState = {
  message: "",
  errors: {},
};

export default function StudentForm() {
  const [state, formAction, isPending] = useActionState(
    validateStudent,
    initialState
  );

  return (
    <div>
      <h1>Student Form Validation</h1>

      <form action={formAction}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" required />
          {state.errors.name && (
            <p>{state.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
          />
          {state.errors.email && (
            <p>{state.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            name="age"
            type="number"
            required
          />
          {state.errors.age && (
            <p>{state.errors.age}</p>
          )}
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>

      {state.message && <p>{state.message}</p>}
    </div>
  );
}