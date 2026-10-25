"use client";

import { useState } from "react";

export default function AddTaskPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        UserID: Number(data.UserID),
        IsCompleted: data.IsCompleted === "on"
      })
    });

    const result = await response.json();
    setMessage(response.ok ? `Task added. ID: ${result.TaskID}` : result.message);

    if (response.ok) form.reset();
  }

  return (
    <main>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <input name="TaskTitle" placeholder="Task Title" required />
        <textarea name="TaskDescription"
          placeholder="Task Description" required />
        <label>
          <input type="checkbox" name="IsCompleted" />
          Completed
        </label>
        <input name="UserID" type="number"
          placeholder="User ID" required min="1" />
        <button type="submit">Add Task</button>
      </form>
      <p role="status">{message}</p>
    </main>
  );
}
