function isPrime(num: number): boolean {
  if (num < 2) return false;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}

export default async function PrimePage({
  params,
}: {
  params: { start: string, end: string };
}) {
  const { start, end } = await params;

  const first = Number(start);
  const last = Number(end);

  const primes = [];

  for (let i = first; i <= last; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return (
    <div>
      <h1>Prime Numbers</h1>
      <p>Start: {first}</p>
      <p>End: {last}</p>
      <p>Prime Numbers: {primes.join(", ")}</p>
    </div>
  );
}
