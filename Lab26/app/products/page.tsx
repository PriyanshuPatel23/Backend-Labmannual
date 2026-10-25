import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MongoDB Products",
};

async function fetchProducts(search?: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  if (search) url.searchParams.set("search", search);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await fetchProducts();   

  return (
    <main style={{ padding: "1rem" }}>
      <h1>MongoDB Products</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p._id}>
            <strong>{p.name}</strong> – {p.description} (${p.price})
          </li>
        ))}
      </ul>
    </main>
  );
}