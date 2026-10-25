import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail",
};

async function fetchProduct(id: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/mysql/products/${id}`);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  return (
    <main style={{ padding: "1rem" }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <a href="/mysql/products">← Back to products</a>
    </main>
  );
}
