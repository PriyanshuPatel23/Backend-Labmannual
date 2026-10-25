import { Suspense } from "react";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading photo...</p>}>
      <PhotoDetails params={params} />
    </Suspense>
  );
}

async function PhotoDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Photo Details Page</h1>
      <p>Photo ID: {id}</p>
    </div>
  );
}
