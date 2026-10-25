import Link from "next/link";

export default function PhotosPage() {
  const photos = [
    { id: "1", title: "Mountain" },
    { id: "2", title: "Ocean" },
    { id: "3", title: "Forest" },
  ];

  return (
    <div>
      <h1>Photo Gallery</h1>

      {photos.map((photo) => (
        <p key={photo.id}>
          <Link href={`/photo/${photo.id}`}>
            {photo.title}
          </Link>
        </p>
      ))}
    </div>
  );
}