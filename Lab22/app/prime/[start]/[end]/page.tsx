'use client'
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) if (num % i === 0) return false;
  return true;
}

export default function PrimeRangePage() {
  const { start, end } = useParams<{ start: string; end: string }>();
  const s = Number(start);
  const e = Number(end);

  if (Number.isNaN(s) || Number.isNaN(e) || s > e) notFound();

  const primes: number[] = [];
  for (let n = s; n <= e; n++) if (isPrime(n)) primes.push(n);

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Primes between {s} and {e}</h2>
      {primes.length ? (
        <p>{primes.join(", ")}</p>
      ) : (
        <p>❌ No prime numbers in this range.</p>
      )}
    </section>
  );
}
