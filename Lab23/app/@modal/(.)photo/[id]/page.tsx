import Link from "next/link";
import { Suspense } from "react";

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <PhotoModalContent params={params} />
    </Suspense>
  );
}

async function PhotoModalContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ background: "white", padding: "30px" }}>
        <h2>Photo Modal</h2>
        <p>Photo ID: {id}</p>
        <Link href="/photos">Close Modal</Link>
      </div>
    </div>
  );
}