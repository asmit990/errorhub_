export const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:       #0a0b0d;
    --surface:  #111317;
    --surface2: #161a1f;
    --border:   #1e2229;
    --border2:  #252c35;
    --green:    #22c55e;
    --green-dim:#16a34a;
    --green-glow: rgba(34,197,94,0.18);
    --green-glow-sm: rgba(34,197,94,0.08);
    --text:     #e2e8f0;
    --muted:    #64748b;
    --muted2:   #8899aa;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'DM Sans', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection { background: var(--green-glow); color: var(--green); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideIn {
    from { opacity:0; transform:translateX(-10px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 0 0 var(--green-glow); }
    50%     { box-shadow: 0 0 20px 4px var(--green-glow); }
  }
  .fade-up-1 { animation: fadeUp 0.55s ease both; animation-delay: 0.05s; }
  .fade-up-2 { animation: fadeUp 0.55s ease both; animation-delay: 0.15s; }
  .fade-up-3 { animation: fadeUp 0.55s ease both; animation-delay: 0.25s; }
  .fade-up-4 { animation: fadeUp 0.55s ease both; animation-delay: 0.38s; }
  .fade-up-5 { animation: fadeUp 0.55s ease both; animation-delay: 0.52s; }

  .btn-primary {
    background: var(--green);
    color: #000;
    font-family: var(--mono);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.04em;
    padding: 10px 22px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.18s ease;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    text-decoration: none;
    line-height: 1;
  }
  .btn-primary:hover {
    background: #4ade80;
    box-shadow: 0 0 18px 3px var(--green-glow);
    transform: translateY(-1px);
  }
  .btn-secondary {
    background: transparent;
    color: var(--muted2);
    font-family: var(--mono);
    font-weight: 400;
    font-size: 13px;
    letter-spacing: 0.04em;
    padding: 10px 22px;
    border: 1px solid var(--border2);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.18s ease;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    text-decoration: none;
    line-height: 1;
  }
  .btn-secondary:hover {
    border-color: var(--green);
    color: var(--green);
  }
  .nav-link {
    color: var(--muted);
    font-family: var(--mono);
    font-size: 13px;
    text-decoration: none;
    transition: color 0.15s;
    letter-spacing: 0.02em;
  }
  .nav-link:hover { color: var(--text); }
  .nav-link-router {
    color: var(--muted);
    font-family: var(--mono);
    font-size: 13px;
    text-decoration: none;
    transition: color 0.15s;
    letter-spacing: 0.02em;
  }
  .nav-link-router:hover { color: var(--green) !important; }
  .section-label {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--green);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;