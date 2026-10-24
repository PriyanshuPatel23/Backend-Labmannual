// app/albums/[id]/page.tsx
export const metadata = {
  title: "Album Detail",
  description: "Show a single album",
};

export default async function AlbumDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${params.id}`);
  if (!res.ok) return <p>Album not found.</p>;
  const album = await res.json();
  return (
    <section style={{ padding: "2rem" }}>
      <h2>{album.title}</h2>
      <p>Album ID: {album.id}</p>
      <a href="/albums" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to Albums
      </a>
    </section>
  );
}
