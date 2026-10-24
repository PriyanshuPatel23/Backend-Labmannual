import '../globals.css';
export const metadata = { title: 'Auth', description: 'Login / Register' };

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <section style={{ background: '#f0f9ff', minHeight: '100vh' }}>
      <header style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>Auth Area</h2>
      </header>
      <main style={{ maxWidth: '400px', margin: '2rem auto' }}>{children}</main>
    </section>
  );
}
