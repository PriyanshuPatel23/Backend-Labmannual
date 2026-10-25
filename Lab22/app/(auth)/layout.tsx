export default function AuthLayout({ children }) {
  return (
    <div style={{ background: "#eeeeff", padding: "30px" }}>
      <h2>Authentication Layout</h2>
      {children}
    </div>
  );
}