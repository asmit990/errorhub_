import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = ["Getting Started", "SDK", "CLI", "API Reference", "Examples"];

const SIDEBAR = [
  {
    section: "Introduction",
    items: [
      { label: "Overview", id: "overview" },
      { label: "How It Works", id: "how-it-works" },
      { label: "Quick Start", id: "quickstart" },
    ],
  },
  {
    section: "CLI",
    items: [
      { label: "Installation", id: "cli-install" },
      { label: "errorhub login", id: "cli-login" },
      { label: "errorhub project", id: "cli-project" },
    ],
  },
  {
    section: "SDK",
    items: [
      { label: "Node.js Setup", id: "node" },
      { label: "Browser Setup", id: "browser" },
      { label: "captureError()", id: "captureError" },
      { label: "setUpGlobalListener()", id: "globalListener" },
    ],
  },
  {
    section: "API Reference",
    items: [
      { label: "POST /errors", id: "api-post" },
      { label: "Authentication", id: "api-auth" },
    ],
  },
];

const CODE = {
  install: `# Install the SDK
npm install errorhub-sdk

# Install the CLI globally
npm install -g errorhub-cli`,

  cliLogin: `# Login to ErrorHub
errorhub login

# Opens browser → you login → token saved to ~/.token.json`,

  cliProject: `# Link your project using API key
errorhub project pk_bca700c37d5dfda5b2c7675273f1e77d

# Fetches project → saves projectId to ~/projectId.json`,

  nodeSetup: `import { setUpGlobalListener } from 'errorhub-sdk'

// Add this ONE line at the top of your app entry point
setUpGlobalListener()

// That's it! All uncaught errors are now tracked automatically.`,

  browserSetup: `import { init, setUpGlobalListener } from 'errorhub-sdk/browser'

// Get token + projectId from your errorhub dashboard
init({
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  projectId: 'a2513bfc-0e36-4ac0-920c-056b49a6e581'
})

// Start capturing all errors automatically
setUpGlobalListener()`,

  captureError: `import { captureError } from 'errorhub-sdk'

// Manually capture any error
captureError({
  message: "Something went wrong",
  filename: "App.tsx",
  lineno: 42,
  colno: 10,
  timestamp: Date.now()
})`,

  globalListener: `import { setUpGlobalListener } from 'errorhub-sdk'

// Automatically captures:
// ✓ uncaughtException
// ✓ unhandledRejection
setUpGlobalListener()

// All errors are sent to your dashboard instantly`,

  apiPost: `curl -X POST \\
  https://errorhub.onrender.com/projects/:projectId/errors \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <token>" \\
  -d '{
    "message": "Button crashed",
    "filename": "App.tsx",
    "lineno": 10,
    "colno": 5,
    "timestamp": 1700000000000
  }'`,
};

function ErrorHubLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="26" height="26" rx="6" stroke="#22c55e" strokeWidth="1.8" fill="none"/>
      <path
        d="M4 14h4l2.5-5 3 10 3-8 2.5 5H24"
        stroke="#22c55e"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlight = (line: string) => {
    if (line.startsWith("#")) return <span style={{ color: "#4a5568" }}>{line}</span>;
    if (line.startsWith("import")) {
      return (
        <span>
          <span style={{ color: "#22c55e" }}>import</span>
          {line.slice(6).split(" from ").map((part, i) =>
            i === 0 ? (
              <span key={i} style={{ color: "#e2e8f0" }}>{part}</span>
            ) : (
              <span key={i}>
                <span style={{ color: "#22c55e" }}> from </span>
                <span style={{ color: "#f6ad55" }}>{part}</span>
              </span>
            )
          )}
        </span>
      );
    }
    if (line.includes("errorhub")) return <span style={{ color: "#22c55e" }}>{line}</span>;
    return <span style={{ color: "#e2e8f0" }}>{line}</span>;
  };

  return (
    <div style={{ background: "#0d1117", border: "1px solid #1a2332", borderRadius: "8px", overflow: "hidden", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #1a2332", background: "#0a0e14" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <span style={{ color: "#4a5568", fontSize: "11px", fontFamily: "monospace" }}>{lang}</span>
        <button onClick={copy} style={{ background: "transparent", border: "1px solid #1a2332", color: copied ? "#22c55e" : "#4a5568", padding: "3px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontFamily: "monospace", transition: "all 0.2s" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "20px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "13px", lineHeight: "1.8", overflowX: "auto" }}>
        {code.split("\n").map((line, i) => (
          <div key={i}>{highlight(line) || <br />}</div>
        ))}
      </pre>
    </div>
  );
}

function Badge({ children, color = "#22c55e" }: { children: string; color?: string }) {
  return (
    <span style={{ background: `${color}18`, color, border: `1px solid ${color}40`, padding: "2px 10px", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.05em" }}>
      {children}
    </span>
  );
}

function Section({ id, title, badge, children }: { id: string; title: string; badge?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: "64px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#e2e8f0", fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>{title}</h2>
        {badge && <Badge>{badge}</Badge>}
      </div>
      <div style={{ width: "40px", height: "2px", background: "#22c55e", marginBottom: "24px" }} />
      {children}
    </section>
  );
}

function Param({ name, type, required, desc }: { name: string; type: string; required?: boolean; desc: string }) {
  return (
    <div style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: "1px solid #1a2332", alignItems: "flex-start" }}>
      <div style={{ minWidth: "160px" }}>
        <span style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "13px" }}>{name}</span>
        {required && <span style={{ color: "#fc8181", fontSize: "10px", marginLeft: "6px" }}>required</span>}
      </div>
      <span style={{ color: "#f6ad55", fontFamily: "monospace", fontSize: "12px", minWidth: "80px" }}>{type}</span>
      <span style={{ color: "#718096", fontSize: "13px", lineHeight: 1.6 }}>{desc}</span>
    </div>
  );
}

export default function Documents() {
  const [active, setActive] = useState("overview");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: "#080c10", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0e14; }
        ::-webkit-scrollbar-thumb { background: #1a2332; border-radius: 3px; }
        a { text-decoration: none; }
        .sidebar-item:hover { color: #22c55e !important; background: #22c55e08 !important; }
        .nav-link:hover { color: #22c55e !important; }
      `}</style>

      {/* Top Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#080c10ee", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a2332", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <ErrorHubLogo size={28} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "16px", color: "#22c55e", letterSpacing: "0.03em" }}>errorhub</span>
          </Link>
          <div style={{ display: "flex", gap: "4px" }}>
            {NAV_ITEMS.map(item => (
              <a key={item} className="nav-link" href="#" style={{ color: item === "Getting Started" ? "#22c55e" : "#718096", fontSize: "13px", padding: "6px 12px", borderRadius: "6px", transition: "color 0.2s", fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{item}</a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Badge color="#718096">v1.0.0</Badge>
          <Link to="/register" style={{ background: "#22c55e", color: "#080c10", padding: "7px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", textDecoration: "none" }}>Get Started →</Link>
        </div>
      </nav>

      <div style={{ display: "flex", maxWidth: "1280px", margin: "0 auto" }}>

        {/* ─── Optimised Sidebar ─── */}
        <aside style={{ width: "220px", flexShrink: 0, position: "sticky", top: "56px", height: "calc(100vh - 56px)", overflowY: "auto", padding: "24px 0 32px", borderRight: "1px solid #1a2332" }}>
          {SIDEBAR.map((group, gi) => (
            <div key={group.section} style={{ marginBottom: gi === SIDEBAR.length - 1 ? 0 : "4px" }}>
              {/* Section header */}
              <div style={{ color: "#2d3748", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontWeight: 700, padding: "12px 16px 4px", fontFamily: "'JetBrains Mono', monospace" }}>
                {group.section}
              </div>
              {/* Items */}
              {group.items.map(item => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    className="sidebar-item"
                    onClick={() => scrollTo(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "100%",
                      textAlign: "left" as const,
                      background: isActive ? "#22c55e0d" : "transparent",
                      border: "none",
                      borderLeft: isActive ? "2px solid #22c55e" : "2px solid transparent",
                      color: isActive ? "#22c55e" : "#4a5568",
                      padding: "6px 16px",
                      fontSize: "12.5px",
                      cursor: "pointer",
                      transition: "all 0.12s",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* ─── Main Content ─── */}
        <main style={{ flex: 1, padding: "48px 64px", maxWidth: "860px" }}>

          {/* Hero */}
          <div style={{ marginBottom: "64px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <Badge>SDK</Badge>
              <Badge color="#f6ad55">CLI</Badge>
              <Badge color="#63b3ed">DASHBOARD</Badge>
            </div>
            <h1 style={{ fontSize: "40px", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", fontFamily: "'JetBrains Mono', monospace" }}>
              <span style={{ color: "#e2e8f0" }}>errorhub </span>
              <span style={{ color: "#22c55e" }}>docs</span>
            </h1>
            <p style={{ color: "#718096", fontSize: "16px", lineHeight: 1.7, maxWidth: "560px" }}>
              Install the SDK. Authenticate with the CLI. Get instant visibility into crashes and exceptions across every project you ship.
            </p>
          </div>

          {/* ─── Overview ─── */}
          <Section id="overview" title="Overview" badge="intro">
            <p style={{ color: "#718096", marginBottom: "20px", lineHeight: 1.7 }}>
              ErrorHub is an error tracking platform with two parts — an <strong style={{ color: "#e2e8f0" }}>SDK</strong> you install in your app and a <strong style={{ color: "#e2e8f0" }}>CLI</strong> for authentication. Together they automatically capture and send every unhandled error to your dashboard.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              {[
                { icon: "📦", label: "errorhub-sdk", desc: "Install in your app" },
                { icon: "⌨️", label: "errorhub-cli", desc: "Auth via terminal" },
                { icon: "📊", label: "Dashboard", desc: "View errors live" },
              ].map(item => (
                <div key={item.label} style={{ background: "#0a0e14", border: "1px solid #1a2332", borderRadius: "8px", padding: "16px", textAlign: "center" as const }}>
                  <div style={{ fontSize: "20px", marginBottom: "8px" }}>{item.icon}</div>
                  <div style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "12px", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ color: "#4a5568", fontSize: "12px" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* ─── How It Works ─── */}
          <Section id="how-it-works" title="How It Works" badge="flow">
            <p style={{ color: "#718096", marginBottom: "24px", lineHeight: 1.7 }}>
              ErrorHub uses two config files saved on the user's machine — a token and a project ID. The SDK reads these automatically so you never hardcode credentials in your app.
            </p>
            <div style={{ background: "#0a0e14", border: "1px solid #1a2332", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
              {[
                { step: "01", text: "Run errorhub login → token saved to ~/.token.json" },
                { step: "02", text: "Run errorhub project <key> → projectId saved to ~/projectId.json" },
                { step: "03", text: "SDK reads both files automatically at startup" },
                { step: "04", text: "Any uncaught error triggers captureError()" },
                { step: "05", text: "POST request sent to your backend with error data" },
                { step: "06", text: "Error appears in your dashboard instantly" },
              ].map((item, i, arr) => (
                <div key={item.step} style={{ display: "flex", gap: "16px", paddingBottom: i === arr.length - 1 ? 0 : "16px", marginBottom: i === arr.length - 1 ? 0 : "16px", borderBottom: i === arr.length - 1 ? "none" : "1px solid #1a233240" }}>
                  <span style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "11px", minWidth: "28px", paddingTop: "2px" }}>{item.step}</span>
                  <span style={{ color: "#718096", fontSize: "13px", lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#22c55e10", border: "1px solid #22c55e30", borderRadius: "8px", padding: "16px 20px", display: "flex", gap: "12px" }}>
              <span>💡</span>
              <span style={{ color: "#718096", fontSize: "13px", lineHeight: 1.6 }}>
                The token and projectId are stored on the <strong style={{ color: "#e2e8f0" }}>developer's machine</strong>, not in code. No secrets in your repo.
              </span>
            </div>
          </Section>

          {/* ─── Quick Start ─── */}
          <Section id="quickstart" title="Quick Start" badge="5 min">
            <p style={{ color: "#718096", marginBottom: "24px", lineHeight: 1.7 }}>
              Get up and running in under 5 minutes.
            </p>

            {/* Node.js flow */}
            <h3 style={{ color: "#e2e8f0", fontSize: "15px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "16px" }}>🖥️ Node.js App</h3>
            <div style={{ background: "#0a0e14", border: "1px solid #1a2332", borderRadius: "8px", padding: "20px 24px", marginBottom: "16px" }}>
              {[
                { num: "01", cmd: "npm install errorhub-sdk", desc: "Install SDK" },
                { num: "02", cmd: "npm install -g errorhub-cli", desc: "Install CLI globally" },
                { num: "03", cmd: "errorhub login", desc: "Login — opens browser, saves token" },
                { num: "04", cmd: "errorhub project <apiKey>", desc: "Link project — saves projectId" },
                { num: "05", cmd: "setUpGlobalListener()", desc: "Add to your app entry point" },
              ].map(step => (
                <div key={step.num} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 0", borderBottom: "1px solid #1a233225" }}>
                  <span style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "11px", minWidth: "28px" }}>{step.num}</span>
                  <code style={{ color: "#e2e8f0", fontFamily: "monospace", fontSize: "12px", flex: 1 }}>{step.cmd}</code>
                  <span style={{ color: "#4a5568", fontSize: "12px" }}>{step.desc}</span>
                </div>
              ))}
            </div>
            <CodeBlock code={`import { setUpGlobalListener } from 'errorhub-sdk'\nsetUpGlobalListener()\n\n// Done! All errors now go to your dashboard automatically`} lang="typescript" />

            {/* Browser flow */}
            <h3 style={{ color: "#e2e8f0", fontSize: "15px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "16px", marginTop: "32px" }}>🌐 Browser / React App</h3>
            <div style={{ background: "#0a0e14", border: "1px solid #1a2332", borderRadius: "8px", padding: "20px 24px", marginBottom: "16px" }}>
              {[
                { num: "01", cmd: "npm install errorhub-sdk", desc: "Install SDK" },
                { num: "02", cmd: "Go to your dashboard", desc: "Copy token + projectId" },
                { num: "03", cmd: "init({ token, projectId })", desc: "Initialize in your app" },
                { num: "04", cmd: "setUpGlobalListener()", desc: "Start capturing errors" },
              ].map(step => (
                <div key={step.num} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 0", borderBottom: "1px solid #1a233225" }}>
                  <span style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "11px", minWidth: "28px" }}>{step.num}</span>
                  <code style={{ color: "#e2e8f0", fontFamily: "monospace", fontSize: "12px", flex: 1 }}>{step.cmd}</code>
                  <span style={{ color: "#4a5568", fontSize: "12px" }}>{step.desc}</span>
                </div>
              ))}
            </div>
            <CodeBlock code={`import { init, setUpGlobalListener } from 'errorhub-sdk/browser'\n\ninit({\n  token: 'your-token-from-dashboard',\n  projectId: 'your-project-id'\n})\n\nsetUpGlobalListener()\n\n// Done!`} lang="typescript" />
          </Section>

          {/* ─── CLI Install ─── */}
          <Section id="cli-install" title="CLI Installation" badge="errorhub-cli">
            <p style={{ color: "#718096", marginBottom: "20px", lineHeight: 1.7 }}>
              Install the CLI globally once — use it across all your projects.
            </p>
            <CodeBlock code={`npm install -g errorhub-cli\n\n# Verify install\nerrorhub --version`} lang="bash" />
          </Section>

          {/* ─── CLI Login ─── */}
          <Section id="cli-login" title="errorhub login" badge="auth">
            <p style={{ color: "#718096", marginBottom: "20px", lineHeight: 1.7 }}>
              Opens a browser window for authentication. After login your token is automatically saved to your home directory.
            </p>
            <CodeBlock code={CODE.cliLogin} lang="bash" />
            <div style={{ background: "#f6ad5510", border: "1px solid #f6ad5530", borderRadius: "8px", padding: "16px 20px", display: "flex", gap: "12px" }}>
              <span>⚠️</span>
              <div style={{ color: "#718096", fontSize: "13px", lineHeight: 1.6 }}>
                Token saved to <code style={{ color: "#22c55e", fontFamily: "monospace" }}>~/.token.json</code>. Add this to your <code style={{ color: "#22c55e", fontFamily: "monospace" }}>.gitignore</code>.
              </div>
            </div>
          </Section>

          {/* ─── CLI Project ─── */}
          <Section id="cli-project" title="errorhub project" badge="linking">
            <p style={{ color: "#718096", marginBottom: "20px", lineHeight: 1.7 }}>
              Link your project using the API key from your dashboard. This saves the projectId which the SDK uses to route errors correctly.
            </p>
            <CodeBlock code={CODE.cliProject} lang="bash" />
            <div style={{ background: "#f6ad5510", border: "1px solid #f6ad5530", borderRadius: "8px", padding: "16px 20px", display: "flex", gap: "12px" }}>
              <span>⚠️</span>
              <div style={{ color: "#718096", fontSize: "13px", lineHeight: 1.6 }}>
                Project ID saved to <code style={{ color: "#22c55e", fontFamily: "monospace" }}>~/projectId.json</code>. Add this to your <code style={{ color: "#22c55e", fontFamily: "monospace" }}>.gitignore</code>.
              </div>
            </div>
          </Section>

          {/* ─── Node SDK ─── */}
          <Section id="node" title="Node.js SDK" badge="errorhub-sdk">
            <p style={{ color: "#718096", marginBottom: "24px", lineHeight: 1.7 }}>
              After running the CLI commands, add one line to your entry point. All uncaught exceptions and unhandled promise rejections are captured automatically.
            </p>
            <CodeBlock code={CODE.nodeSetup} lang="typescript" />
            <h3 style={{ color: "#a0aec0", fontSize: "14px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "16px" }}>What gets captured automatically:</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "message", desc: "Error message" },
                { label: "filename", desc: "Source file" },
                { label: "lineno", desc: "Line number" },
                { label: "colno", desc: "Column number" },
                { label: "stack", desc: "Full stack trace" },
                { label: "timestamp", desc: "Date.now()" },
              ].map(item => (
                <div key={item.label} style={{ background: "#0a0e14", border: "1px solid #1a2332", borderRadius: "6px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "12px" }}>{item.label}</span>
                  <span style={{ color: "#4a5568", fontSize: "12px" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ─── Browser SDK ─── */}
          <Section id="browser" title="Browser SDK" badge="errorhub-sdk/browser">
            <p style={{ color: "#718096", marginBottom: "24px", lineHeight: 1.7 }}>
              For browser and React apps. Initialize with your credentials from the dashboard — no CLI needed.
            </p>
            <CodeBlock code={CODE.browserSetup} lang="typescript" />
            <div style={{ background: "#22c55e10", border: "1px solid #22c55e30", borderRadius: "8px", padding: "16px 20px", display: "flex", gap: "12px" }}>
              <span>💡</span>
              <div style={{ color: "#718096", fontSize: "13px", lineHeight: 1.6 }}>
                Token and projectId are stored in <code style={{ color: "#22c55e", fontFamily: "monospace" }}>localStorage</code> after calling <code style={{ color: "#22c55e", fontFamily: "monospace" }}>init()</code>. Get them from your errorhub dashboard.
              </div>
            </div>
          </Section>

          {/* ─── captureError ─── */}
          <Section id="captureError" title="captureError()" badge="manual">
            <p style={{ color: "#718096", marginBottom: "24px", lineHeight: 1.7 }}>
              Manually capture any error. Useful for caught exceptions you still want to track.
            </p>
            <CodeBlock code={CODE.captureError} lang="typescript" />
            <h3 style={{ color: "#a0aec0", fontSize: "14px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "12px" }}>Parameters:</h3>
            <div style={{ background: "#0a0e14", border: "1px solid #1a2332", borderRadius: "8px", overflow: "hidden" }}>
              <Param name="message" type="string" required desc="The error message to capture" />
              <Param name="filename" type="string" desc="Source file where error occurred" />
              <Param name="lineno" type="number" desc="Line number in the source file" />
              <Param name="colno" type="number" desc="Column number in the source file" />
              <Param name="timestamp" type="number" desc="Unix timestamp in milliseconds" />
            </div>
          </Section>

          {/* ─── setUpGlobalListener ─── */}
          <Section id="globalListener" title="setUpGlobalListener()" badge="auto">
            <p style={{ color: "#718096", marginBottom: "24px", lineHeight: 1.7 }}>
              Sets up listeners for all uncaught errors in your app. Call this once at startup — it handles everything automatically.
            </p>
            <CodeBlock code={CODE.globalListener} lang="typescript" />
            <div style={{ background: "#0a0e14", border: "1px solid #1a2332", borderRadius: "8px", padding: "20px 24px" }}>
              <div style={{ color: "#4a5568", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "12px", fontFamily: "monospace" }}>Listens for</div>
              {[
                { event: "uncaughtException", desc: "Any thrown error that wasn't caught" },
                { event: "unhandledRejection", desc: "Any rejected Promise that wasn't caught" },
              ].map(item => (
                <div key={item.event} style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid #1a233230" }}>
                  <code style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "12px", minWidth: "200px" }}>{item.event}</code>
                  <span style={{ color: "#718096", fontSize: "13px" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ─── API Post ─── */}
          <Section id="api-post" title="POST /errors" badge="REST">
            <p style={{ color: "#718096", marginBottom: "24px", lineHeight: 1.7 }}>
              The SDK calls this endpoint automatically. Use it directly if you need a custom integration.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ background: "#22c55e20", color: "#22c55e", fontFamily: "monospace", fontSize: "12px", padding: "4px 10px", borderRadius: "4px", fontWeight: 700 }}>POST</span>
              <code style={{ color: "#e2e8f0", fontFamily: "monospace", fontSize: "14px" }}>/projects/:projectId/errors</code>
            </div>
            <CodeBlock code={CODE.apiPost} lang="bash" />
            <div style={{ background: "#0a0e14", border: "1px solid #1a2332", borderRadius: "8px", padding: "16px 20px" }}>
              <div style={{ color: "#4a5568", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "12px", fontFamily: "monospace" }}>Response</div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ background: "#22c55e20", color: "#22c55e", fontFamily: "monospace", fontSize: "12px", padding: "3px 10px", borderRadius: "4px" }}>201 Created</span>
                <span style={{ color: "#718096", fontSize: "13px" }}>Error successfully logged</span>
              </div>
            </div>
          </Section>

          {/* ─── Auth ─── */}
          <Section id="api-auth" title="Authentication" badge="JWT">
            <p style={{ color: "#718096", marginBottom: "24px", lineHeight: 1.7 }}>
              Every request to the API requires a Bearer token in the Authorization header. This token is obtained via <code style={{ color: "#22c55e", fontFamily: "monospace" }}>errorhub login</code> and stored at <code style={{ color: "#22c55e", fontFamily: "monospace" }}>~/.token.json</code>.
            </p>
            <CodeBlock code={`# The SDK attaches this header automatically\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`} lang="bash" />
            <div style={{ background: "#fc818110", border: "1px solid #fc818130", borderRadius: "8px", padding: "16px 20px", display: "flex", gap: "12px" }}>
              <span>🔐</span>
              <div style={{ color: "#718096", fontSize: "13px", lineHeight: 1.6 }}>
                If you get a <code style={{ color: "#fc8181", fontFamily: "monospace" }}>401 Unauthorized</code>, run <code style={{ color: "#22c55e", fontFamily: "monospace" }}>errorhub login</code> again to refresh your token.
              </div>
            </div>
          </Section>

          {/* Footer */}
          <div style={{ borderTop: "1px solid #1a2332", paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#4a5568", fontSize: "12px", fontFamily: "monospace" }}>errorhub v1.0.0</span>
            <div style={{ display: "flex", gap: "20px" }}>
              {["GitHub", "npm", "Issues"].map(link => (
                <a key={link} href="#" className="nav-link" style={{ color: "#4a5568", fontSize: "12px", transition: "color 0.2s", fontFamily: "monospace" }}>{link}</a>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}