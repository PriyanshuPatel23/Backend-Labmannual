// app/todos/page.tsx
export const metadata = {
  title: "Todos",
  description: "List of todos from JSONPlaceholder",
};

export default async function TodosPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Todos</h2>
      <ul>
        {todos.slice(0, 20).map((t: any) => (
          <li key={t.id} style={{ marginBottom: "0.5rem" }}>
            <a href={`/todos/${t.id}`} style={{ fontWeight: "bold" }}>
              {t.title}
            </a>
            <p>{t.completed ? "✅ Completed" : "❌ Incomplete"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
