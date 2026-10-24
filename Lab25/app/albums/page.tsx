// app/albums/page.tsx
export const metadata = {
  title: "Albums",
  description: "List of albums from JSONPlaceholder",
};

export default async function AlbumsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await res.json();

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Albums</h2>
      <ul>
        {albums.map((a: any) => (
          <li key={a.id} style={{ marginBottom: "0.5rem" }}>
            <a href={`/albums/${a.id}`} style={{ fontWeight: "bold" }}>
              {a.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
