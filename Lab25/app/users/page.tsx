export const metadata = {
  title: "All Items",
  description: "List of items from mock API"
};

export default async function AllItemsPage() {
  const res = await fetch("https://reqres.in/api/users?page=2");
  const items: { id: number; email: string; first_name: string, last_name: string, avatar: string }[] = await res.json();

  return (
    <section style={{ padding: "2rem" }}>
      <h2>All Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <a href={`/item/${item.id}`} style={{ fontWeight: "bold" }}>
              {item.first_name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
