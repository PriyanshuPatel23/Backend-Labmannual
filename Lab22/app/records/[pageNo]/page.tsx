'use client'
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

const RECORDS_PER_PAGE = 10;

export default function RecordsPage() {
  const { pageNo } = useParams<{ pageNo: string }>();
  const page = Number(pageNo);

  if (!Number.isInteger(page) || page < 1) notFound();

  const startIdx = (page - 1) * RECORDS_PER_PAGE + 1;
  const endIdx = page * RECORDS_PER_PAGE;

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Page {page}</h2>
      <p>
        Showing records <strong>{startIdx}</strong>–<strong>{endIdx}</strong>
      </p>
    </section>
  );
}
