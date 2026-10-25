"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    setMessage(
      response.ok ? "Registration successful!" : result.message
    );

    if (response.ok) form.reset();
  }

  return (
    <main>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input name="UserName" placeholder="Username" required />
        <input name="Email" type="email" placeholder="Email" required />
        <input name="Password" type="password"
          placeholder="Password" required minLength={8} />
        <button type="submit">Register</button>
      </form>
      <p role="status">{message}</p>
    </main>
  );
}