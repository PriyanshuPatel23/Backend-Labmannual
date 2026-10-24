export const metadata = {
  title: "Item Detail",
  description: "Display a single item fetched by ID from mock API"
};

export default async function ItemPage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  if (!res.ok) {
    return <p>Item not found.</p>;
  }
  const item: { id: number; title: string; body: string } = await res.json();

  return (
    <section style={{ padding: "2rem" }}>
      <h2>{item.title}</h2>
      <p>{item.body}</p>
      <a href="/all" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to all items
      </a>
    </section>
  );
}
