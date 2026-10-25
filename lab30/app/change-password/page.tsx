
"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    setMessage(result.message);
    if (response.ok) form.reset();
  }

  return (
    <main>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <input name="UserID" type="number"
          placeholder="User ID" required min="1" />
        <input name="OldPassword" type="password"
          placeholder="Old Password" required />
        <input name="NewPassword" type="password"
          placeholder="New Password" required minLength={8} />
        <button type="submit">Change Password</button>
      </form>
      <p role="status">{message}</p>
    </main>
  );
}
