import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Lab 20 - Next.js Routing',
  description: 'Basic routing and navigation in Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mt-4">
          {children}
        </main>
        <footer className="text-center py-3 mt-5 bg-dark text-white">
          <p>&copy; 2026 My Next.js App</p>
        </footer>
      </body>
    </html>
  );
}
