export default function DashboardPreview() {
  const [selected, setSelected] = useState(0);
  const levelColor: Record<string, string> = { error: "#ef4444", warn: "#f59e0b", info: "#3b82f6" };
  const envColor: Record<string, string> = { production: "rgba(239,68,68,0.15)", staging: "rgba(245,158,11,0.12)" };
  const envText: Record<string, string> = { production: "#ef4444", staging: "#f59e0b" };

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border2)",
      borderRadius: 10,
      overflow: "hidden",
      fontFamily: "var(--mono)",
      fontSize: 12,
    }}>
      <div style={{
        background: "var(--surface2)",
        borderBottom: "1px solid var(--border)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--green)", fontWeight: 700, letterSpacing: "0.05em" }}>errorhub</span>
          <span style={{ color: "var(--border2)" }}>/</span>
          <span style={{ color: "var(--muted2)" }}>api-gateway</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", display: "inline-block", boxShadow: "0 0 6px var(--green)" }} />
          <span style={{ color: "var(--muted)", fontSize: 11 }}>live</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid var(--border)" }}>
        {[
          { label: "errors / 1h", val: "261", color: "#ef4444" },
          { label: "affected files", val: "5", color: "var(--text)" },
          { label: "environments", val: "2", color: "var(--muted2)" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "12px 16px", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
            <div style={{ color: s.color, fontSize: 18, fontWeight: 700 }}>{s.val}</div>
            <div style={{ color: "var(--muted)", fontSize: 10, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {errors.map((err, i) => (
        <div key={i} onClick={() => setSelected(i)} style={{
          padding: "10px 16px",
          borderBottom: "1px solid var(--border)",
          cursor: "pointer",
          background: selected === i ? "rgba(34,197,94,0.04)" : "transparent",
          borderLeft: selected === i ? "2px solid var(--green)" : "2px solid transparent",
          transition: "all 0.12s ease",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: levelColor[err.level], display: "inline-block", flexShrink: 0 }} />
                <span style={{ color: "var(--muted)", fontSize: 10, letterSpacing: "0.06em" }}>{err.id}</span>
                <span style={{ background: envColor[err.env], color: envText[err.env], fontSize: 9, padding: "1px 6px", borderRadius: 3, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                  {err.env}
                </span>
              </div>
              <div style={{ color: "var(--text)", fontSize: 12, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>{err.msg}</div>
              <div style={{ color: "var(--muted)", fontSize: 10 }}>{err.file}</div>
            </div>
            <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
              <div style={{ color: "var(--muted2)", fontSize: 11, marginBottom: 2 }}>{err.time}</div>
              <div style={{ color: levelColor[err.level], fontSize: 11, fontWeight: 700 }}>×{err.count}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
