export function Step({ num, title, code, desc }: { num: number; title: string; code?: string; desc: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, animation: `fadeUp 0.5s ease both`, animationDelay: `${num * 0.1}s` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          border: "1px solid var(--green)", color: "var(--green)",
          fontFamily: "var(--mono)", fontWeight: 700, fontSize: 13,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>{num}</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{title}</div>
      </div>
      {code && (
        <div style={{
          background: "#0d0f12", border: "1px solid var(--border)",
          borderRadius: 6, padding: "10px 14px",
          fontFamily: "var(--mono)", fontSize: 12, color: "var(--green)", marginLeft: 44,
        }}>
          <span style={{ color: "var(--green)", marginRight: 8 }}>❯</span>{code}
        </div>
      )}
      <div style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "var(--muted2)", lineHeight: 1.6, marginLeft: 44 }}>{desc}</div>
    </div>
  );
}
