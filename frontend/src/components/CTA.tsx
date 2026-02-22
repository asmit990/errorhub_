export default function CTA() {
  return (
    <section style={{ padding: "100px 24px", textAlign: "center" as const }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{
          display: "inline-block", marginBottom: 28, padding: "1px", borderRadius: 12,
          background: "linear-gradient(135deg, rgba(34,197,94,0.4), transparent 60%)",
        }}>
          <div style={{
            background: "var(--bg)", borderRadius: 11, padding: "3px 16px",
            fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)",
            letterSpacing: "0.1em", textTransform: "uppercase" as const,
          }}>production-ready</div>
        </div>

        <h2 style={{
          fontFamily: "var(--mono)", fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 700, color: "var(--text)",
          lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16,
        }}>
          Stop guessing.<br />
          <span style={{ color: "var(--green)" }}>Start seeing.</span>
        </h2>

        <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: "var(--muted2)", marginBottom: 36, lineHeight: 1.6 }}>
          Join engineers who ship with confidence. Install once, monitor always.
        </p>

        <div style={{ display: "inline-flex", flexDirection: "column" as const, gap: 14, alignItems: "center" }}>
          <Link to={token ? "/app" : "/register"} className="btn-primary" style={{
            fontSize: 15, padding: "14px 34px",
            animation: "glowPulse 3s ease-in-out infinite",
          }}>
            Get Started — it's free →
          </Link>
          <div style={{
            background: "#0d0f12", border: "1px solid var(--border)",
            borderRadius: 6, padding: "9px 18px",
            fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted2)",
          }}>
            <span style={{ color: "var(--green)", marginRight: 8 }}>❯</span>
            npm install errorhub
          </div>
        </div>
      </div>
    </section>
  );
}
