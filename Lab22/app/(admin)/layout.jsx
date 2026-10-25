export default function AdminLayout({ children }) {
  return (
    <div style={{ background: "#e5ffe5", padding: "30px" }}>
      <h2>Admin Dashboard Layout</h2>
      {children}
    </div>
  );
}