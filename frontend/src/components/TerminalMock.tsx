export default function TerminalMock() {
  const lines = [
    { type: "prompt", text: "npm install errorhub" },
    { type: "output", text: "added 1 package in 0.8s" },
    { type: "blank" },
    { type: "prompt", text: "errorhub login" },
    { type: "output", text: "Opening browser for authentication..." },
    { type: "success", text: "✓ Authenticated as dev@acme.io" },
    { type: "blank" },
    { type: "prompt", text: "errorhub init" },
    { type: "output", text: "? Select project  api-gateway" },
    { type: "success", text: "✓ Config written to .errorhubrc" },
    { type: "success", text: "✓ API key injected into environment" },
    { type: "blank" },
    { type: "dim", text: "# SDK now active — errors streaming live" },
  ];

  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= lines.length) return;
    const t = setTimeout(
      () => setVisible((v) => v + 1),
      visible === 0 ? 600 : lines[visible - 1].type === "blank" ? 120 : 280
    );
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div style={{
      background: "#0d0f12",
      border: "1px solid var(--border2)",
      borderRadius: 10,
      overflow: "hidden",
      fontFamily: "var(--mono)",
      fontSize: 13,
      lineHeight: "1.7",
    }}>
      <div style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ marginLeft: 12, color: "var(--muted)", fontSize: 11, letterSpacing: "0.04em" }}>
          bash — errorhub setup
        </span>
      </div>
      <div style={{ padding: "20px 22px", minHeight: 280 }}>
        {lines.slice(0, visible).map((line, i) => {
          if (line.type === "blank") return <div key={i} style={{ height: 8 }} />;
          if (line.type === "prompt") return (
            <div key={i} style={{ animation: "slideIn 0.2s ease both", display: "flex", gap: 8 }}>
              <span style={{ color: "var(--green)", userSelect: "none" }}>❯</span>
              <span style={{ color: "#e2e8f0" }}>{line.text}</span>
            </div>
          );
          if (line.type === "success") return (
            <div key={i} style={{ animation: "slideIn 0.2s ease both", color: "var(--green)", paddingLeft: 18 }}>
              {line.text}
            </div>
          );
          if (line.type === "dim") return (
            <div key={i} style={{ animation: "slideIn 0.2s ease both", color: "var(--muted)", paddingLeft: 18, fontStyle: "italic" }}>
              {line.text}
            </div>
          );
          return (
            <div key={i} style={{ animation: "slideIn 0.2s ease both", color: "#94a3b8", paddingLeft: 18 }}>
              {line.text}
            </div>
          );
        })}
        {visible < lines.length && (
          <span style={{
            display: "inline-block", width: 7, height: 14,
            background: "var(--green)", marginLeft: visible > 0 ? 18 : 0,
            verticalAlign: "text-bottom", animation: "blink 1s step-end infinite",
          }} />
        )}
      </div>
    </div>
  );
}