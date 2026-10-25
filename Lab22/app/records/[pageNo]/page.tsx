export default async function RecordsPage({
  params,
}: {
  params: { pageNo: string };
}) {
  const { pageNo } = await params;

  const page = Number(pageNo);

  if (!Number.isInteger(page) || page < 1) {
    return <h1>Invalid Page Number</h1>;
  }

  const recordsPerPage = 10;
  const startIndex = (page - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage - 1;

  return (
    <div>
      <h1>Pagination Details</h1>
      <p>Page Number: {page}</p>
      <p>Records Per Page: {recordsPerPage}</p>
      <p>Start Index: {startIndex}</p>
      <p>End Index: {endIndex}</p>
    </div>
  );
}
