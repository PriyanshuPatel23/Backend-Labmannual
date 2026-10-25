import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MySQL Products",
};

async function fetchProducts(search?: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/mysql/products`);
  if (search) url.searchParams.set("search", search);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await fetchProducts();
  return (
    <main style={{ padding: "1rem" }}>
      <h1>MySQL Products</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            <a href={`/mysql/products/${p.id}`}>{p.name} – ${p.price}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
