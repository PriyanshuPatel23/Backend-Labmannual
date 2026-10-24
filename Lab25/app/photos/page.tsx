// app/photos/page.tsx
export const metadata = {
  title: "Photos",
  description: "List of photos from JSONPlaceholder (first 20)",
};

export default async function PhotosPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=20");
  const photos = await res.json();

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Photos</h2>
      <ul>
        {photos.map((p: any) => (
          <li key={p.id} style={{ marginBottom: "0.5rem" }}>
            <a href={`/photos/${p.id}`} style={{ fontWeight: "bold" }}>
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
