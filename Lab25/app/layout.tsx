import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab25 MockAPI Demo",
  description: "Consume mockapi GET endpoints",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: "1rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1>MockAPI Demo</h1>
          <nav>
            <a href="/all" style={{ marginRight: "1rem" }}>All Items</a>
            <a href="/item/1" style={{ marginRight: "1rem" }}>Item 1</a>
            <a href="/users" style={{ marginRight: "1rem" }}>Users</a>
            <a href="/pokemon" style={{ marginRight: "1rem" }}>Pokémon</a>
            <a href="/comments" style={{ marginRight: "1rem" }}>Comments</a>
            <a href="/albums" style={{ marginRight: "1rem" }}>Albums</a>
            <a href="/photos" style={{ marginRight: "1rem" }}>Photos</a>
            <a href="/todos" style={{ marginRight: "1rem" }}>Todos</a>
            <a href="/countries" style={{ marginRight: "1rem" }}>Countries</a>
            <a href="/quotes" style={{ marginRight: "1rem" }}>Quotes</a>
            <a href="/dogs" style={{ marginRight: "1rem" }}>Dogs</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
