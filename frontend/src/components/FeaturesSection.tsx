export default function FeaturesSection() {
  const features = [
    { icon: "⚡", title: "Fast integration", desc: "One package install. SDK wraps your app automatically — no boilerplate required." },
    { icon: "🔑", title: "CLI authentication", desc: "Run `errorhub login` once. Tokens are stored securely and reused across projects." },
    { icon: "🗂", title: "Project isolation", desc: "Errors are scoped to API keys. No cross-project bleed. Clean, organized by design." },
    { icon: "📡", title: "Real-time visibility", desc: "Errors surface the moment they're thrown — no polling, no refresh." },
    { icon: "🧱", title: "Structured capture", desc: "Stack trace, file, line number, environment, and timestamp. Everything you need." },
    { icon: "🪶", title: "Lightweight", desc: "Under 1ms average overhead. The SDK stays out of your critical path." },
  ];

  return (
    <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="section-label">Features</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "var(--mono)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
          Everything in the pipeline.
        </h2>
        <Link to="/features" style={{
          fontFamily: "var(--mono)", fontSize: 12, color: "var(--green)",
          textDecoration: "none", border: "1px solid rgba(34,197,94,0.3)",
          padding: "7px 16px", borderRadius: 6,
          transition: "all 0.18s",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34,197,94,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          View all features →
        </Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {features.map((f, i) => <FeatureCard key={i} {...f} delay={i * 0.07} />)}
      </div>
    </section>
  );
}