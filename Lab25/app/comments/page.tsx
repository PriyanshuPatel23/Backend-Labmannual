// app/comments/page.tsx
export const metadata = {
  title: "Comments",
  description: "List of comments from JSONPlaceholder",
};

export default async function CommentsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await res.json();

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Comments</h2>
      <ul>
        {comments.slice(0, 20).map((c: any) => (
          <li key={c.id} style={{ marginBottom: "0.5rem" }}>
            <a href={`/comments/${c.id}`} style={{ fontWeight: "bold" }}>
              {c.name}
            </a>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
