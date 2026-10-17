import Link from 'next/link';

export default function Home() {
  return (
    <div className="row">
      <div className="col-12 text-center py-5">
        <h1 className="display-4 fw-bold">Welcome to My Next.js App</h1>
        <p className="lead text-muted">
          A simple multi-page application with routing and navigation.
        </p>
        <div className="mt-4">
          <Link href="/about" className="btn btn-primary me-3">
            About Us
          </Link>
          <Link href="/contact" className="btn btn-outline-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
