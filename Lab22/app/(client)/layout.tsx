// app/(client)/layout.tsx
import '../globals.css';
export const metadata = { title: 'Client', description: 'Public UI' };

export default function ClientLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <section style={{ background: '#fefce8', minHeight: '100vh' }}>
      <nav style={{ padding: '1rem', background: '#d97706', color: '#fff' }}>
        <a href="/" style={{ marginRight: '1rem' }}>Home</a>
        <a href="/about">About</a>
      </nav>
      <main style={{ margin: '2rem' }}>{children}</main>
    </section>
  );
}
