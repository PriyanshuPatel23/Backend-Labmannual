
"use client";

import { useState } from "react";

export default function EditTaskPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const id = Number(data.TaskID);

    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TaskTitle: data.TaskTitle,
        TaskDescription: data.TaskDescription,
        IsCompleted: data.IsCompleted === "on"
      })
    });

    const result = await response.json();
    setMessage(response.ok ? "Task updated successfully" : result.message);
  }

  return (
    <main>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <input name="TaskID" type="number"
          placeholder="Task ID" required min="1" />
        <input name="TaskTitle" placeholder="New Task Title" required />
        <textarea name="TaskDescription"
          placeholder="New Description" required />
        <label>
          <input type="checkbox" name="IsCompleted" />
          Completed
        </label>
        <button type="submit">Update Task</button>
      </form>
      <p role="status">{message}</p>
    </main>
  );
}
