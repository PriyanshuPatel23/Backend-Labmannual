export default function LoginPage() {
  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <form style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
        <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Login</h3>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>
            Email
            <input type="email" name="email" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Password
            <input type="password" name="password" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          </label>
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Sign in
        </button>
      </form>
    </section>
  );
}
