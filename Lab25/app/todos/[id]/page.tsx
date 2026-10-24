// app/todos/[id]/page.tsx
export const metadata = {
  title: "Todo Detail",
  description: "Show a single todo",
};

export default async function TodoDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  if (!res.ok) return <p>Todo not found.</p>;
  const todo = await res.json();
  return (
    <section style={{ padding: "2rem" }}>
      <h2>{todo.title}</h2>
      <p>{todo.completed ? "✅ Completed" : "❌ Incomplete"}</p>
      <a href="/todos" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to Todos
      </a>
    </section>
  );
}
