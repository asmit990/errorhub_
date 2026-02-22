export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 24px", background: "var(--surface)" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap" as const, gap: 16,
      }}>
        <Link to="/" style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 14, color: "var(--green)", textDecoration: "none", letterSpacing: "0.03em" }}>
          errorhub
        </Link>

        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" as const }}>
          <Link to="/documents" className="nav-link-router" style={{ fontSize: 12 }}>Docs</Link>
          <Link to="/features" className="nav-link-router" style={{ fontSize: 12 }}>Features</Link>
          <a href="https://github.com" className="nav-link" style={{ fontSize: 12 }} target="_blank" rel="noreferrer">GitHub</a>
          <a href="#" className="nav-link" style={{ fontSize: 12 }}>Privacy</a>
          <a href="#" className="nav-link" style={{ fontSize: 12 }}>Terms</a>
        </div>

        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>
          © 2025 ErrorHub
        </div>
      </div>
    </footer>
  );
}