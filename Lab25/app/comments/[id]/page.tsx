// app/comments/[id]/page.tsx
export const metadata = {
  title: "Comment Detail",
  description: "Show a single comment",
};

export default async function CommentDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${params.id}`);
  if (!res.ok) return <p>Comment not found.</p>;
  const comment = await res.json();
  return (
    <section style={{ padding: "2rem" }}>
      <h2>{comment.name}</h2>
      <p>{comment.body}</p>
      <p><strong>Email:</strong> {comment.email}</p>
      <a href="/comments" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to Comments
      </a>
    </section>
  );
}
