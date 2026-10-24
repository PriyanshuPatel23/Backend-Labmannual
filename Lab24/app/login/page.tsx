// app/login/page.tsx
export const metadata = {
  title: "Login",
  description: "Simple login page to set a token cookie",
};

export default function LoginPage() {
  return (
    <section style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form method="POST" action="/api/login">
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Token:
          <input name="token" type="text" required style={{ marginLeft: "0.5rem" }} />
        </label>
        <button type="submit" style={{ marginTop: "0.5rem" }}>Login</button>
      </form>
    </section>
  );
}
