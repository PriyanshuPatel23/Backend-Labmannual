// app/photos/[id]/page.tsx
export const metadata = {
  title: "Photo Detail",
  description: "Show a single photo",
};

export default async function PhotoDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`);
  if (!res.ok) return <p>Photo not found.</p>;
  const photo = await res.json();
  return (
    <section style={{ padding: "2rem" }}>
      <h2>{photo.title}</h2>
      <img src={photo.url} alt={photo.title} style={{ maxWidth: "100%" }} />
      <p>Album ID: {photo.albumId}</p>
      <a href="/photos" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to Photos
      </a>
    </section>
  );
}
