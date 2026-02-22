export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed" as const,
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: scrolled ? "rgba(10,11,13,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.25s ease",
      padding: "0 24px",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 58,
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "var(--mono)", fontWeight: 700, fontSize: 16,
          color: "var(--green)", textDecoration: "none", letterSpacing: "0.03em",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="16" height="16" rx="3" stroke="#22c55e" strokeWidth="1.5"/>
            <path d="M5 9h3l2-4 2 8 2-4h1" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          errorhub
        </Link>

        {/* Nav links — Features and Documents now use Link */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        
          <Link to="/documents" className="nav-link-router">Docs</Link>
          <a href="https://github.com" className="nav-link" target="_blank" rel="noreferrer">GitHub</a>
          <Link
            to={token ? "/app" : "/register"}
            className="btn-primary"
            style={{ padding: "8px 18px" }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}