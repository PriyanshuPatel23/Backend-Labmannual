import '../globals.css';
export const metadata = { title: 'Admin', description: 'Admin panel' };

export default function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <section style={{ background: '#fff7ed', minHeight: '100vh' }}>
      <header style={{ background: '#c2410c', color: '#fff', padding: '1rem' }}>
        <h2>🛠️ Admin Dashboard</h2>
      </header>
      <main style={{ margin: '2rem' }}>{children}</main>
    </section>
  );
}
