// app/items/page.tsx
export const metadata = {
  title: "Items with Pagination",
  description: "Demo page that reads pageNo query param (default 0 set by middleware)",
};

export default function ItemsPage({ searchParams }: { searchParams: { pageNo?: string } }) {
  const pageNo = parseInt(searchParams.pageNo ?? "0", 10);
  return (
    <section style={{ padding: "2rem" }}>
      <h2>Items – Page {pageNo}</h2>
      <p>This page demonstrates the "pageNo" query parameter. If you visit the route without "?pageNo=…" the middleware adds "pageNo=0" automatically.</p>
    </section>
  );
}
