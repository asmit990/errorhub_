import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { globalStyles } from "@/components/ui/globalStyles";
import TerminalMock from "@/components/TerminalMock";
import DashboardPreview from "@/components/DashboardPreview";
import { Step } from "@/components/Step";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Navbar from "@/components/NavBarforHome";
import FeaturesSection from "@/components/FeaturesSection";
const token = localStorage.getItem("token");


const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=DM+Sans:wght@300;400;500;600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);



const styleEl = document.createElement("style");
styleEl.textContent = globalStyles;
document.head.appendChild(styleEl);


const errors = [
  { id: "ERR-2841", msg: "TypeError: Cannot read properties of undefined", file: "src/api/users.ts:142", env: "production", count: 38, time: "2s ago", level: "error" },
  { id: "ERR-2840", msg: "UnhandledPromiseRejection: fetch failed", file: "src/lib/http.ts:67", env: "production", count: 12, time: "41s ago", level: "error" },
  { id: "ERR-2839", msg: "ReferenceError: stripeKey is not defined", file: "src/billing/checkout.ts:28", env: "staging", count: 3, time: "4m ago", level: "warn" },
  { id: "ERR-2838", msg: "SyntaxError: Unexpected token in JSON", file: "src/utils/parse.ts:11", env: "staging", count: 7, time: "12m ago", level: "warn" },
  { id: "ERR-2837", msg: "Error: Rate limit exceeded (429)", file: "src/services/openai.ts:88", env: "production", count: 201, time: "28m ago", level: "info" },
];




function FeatureCard({ icon, title, desc, delay = 0 }: { icon: string; title: string; desc: string; delay?: number }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "22px",
        animation: `fadeUp 0.5s ease both`,
        animationDelay: `${delay}s`,
        transition: "border-color 0.18s, box-shadow 0.18s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(34,197,94,0.35)";
        e.currentTarget.style.boxShadow = "0 0 18px 0 var(--green-glow-sm)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ fontFamily: "var(--mono)", fontSize: 22, marginBottom: 12, lineHeight: 1 }}>{icon}</div>
      <div style={{ fontFamily: "var(--mono)", fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 7, letterSpacing: "0.02em" }}>{title}</div>
      <div style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "var(--muted2)", lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}




function Hero() {
  return (
    <section style={{ paddingTop: 130, paddingBottom: 100, padding: "130px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="fade-up-1" style={{ marginBottom: 28 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 20, padding: "5px 14px",
          fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)",
          letterSpacing: "0.07em", textTransform: "uppercase" as const,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "blink 2s ease-in-out infinite" }} />
          SDK + CLI + Dashboard
        </span>
      </div>

      <h1 className="fade-up-2" style={{
        fontFamily: "var(--mono)",
        fontSize: "clamp(32px, 5vw, 58px)",
        fontWeight: 700, color: "var(--text)",
        lineHeight: 1.12, letterSpacing: "-0.02em",
        marginBottom: 22, maxWidth: 760,
      }}>
        See production errors<br />
        <span style={{ color: "var(--green)" }}>as they happen.</span>
      </h1>

      <p className="fade-up-3" style={{
        fontFamily: "var(--sans)",
        fontSize: "clamp(15px, 2vw, 17px)",
        color: "var(--muted2)", lineHeight: 1.65,
        maxWidth: 520, marginBottom: 36,
      }}>
        Install the SDK. Authenticate with the CLI. Get instant visibility into
        crashes and exceptions across every project you ship.
      </p>

      <div className="fade-up-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" as const, marginBottom: 60 }}>
        <Link to={token ? "/app" : "/register"} className="btn-primary" style={{ fontSize: 14, padding: "12px 26px" }}>
          Get Started →
        </Link>
        <Link to="/documents" className="btn-secondary" style={{ fontSize: 14, padding: "12px 26px" }}>
          Read Docs
        </Link>
      </div>

      <div className="fade-up-5" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20, alignItems: "start" }}>
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 10 }}>
            01 — Setup
          </div>
          <TerminalMock />
        </div>
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 10 }}>
            02 — Dashboard
          </div>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}


function TrustStrip() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "22px 24px", background: "var(--surface)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16 }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)", letterSpacing: "0.05em" }}>
          Built for engineers running production workloads.
        </p>
        <div style={{ display: "flex", gap: 32 }}>
          {[["<1ms", "SDK overhead"], ["E2E encrypted", "token storage"], ["Per-project", "API key isolation"]].map(([val, lbl]) => (
            <div key={val} style={{ textAlign: "center" as const }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 15, color: "var(--green)", fontWeight: 700, lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function HowItWorks() {
  return (
    <section style={{ padding: "80px 24px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">How it works</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
            Three commands to full visibility.
          </h2>
          <Link to="/documents" style={{
            fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted2)",
            textDecoration: "none", border: "1px solid var(--border2)",
            padding: "7px 16px", borderRadius: 6,
            transition: "all 0.18s",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--green)"; e.currentTarget.style.color = "var(--green)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--muted2)"; }}
          >
            Full docs →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 40 }}>
          <Step num={1} title="Create a project" code="errorhub init" desc="Create a project in the dashboard and receive a scoped API key. One key per service — clean separation from day one." />
          <Step num={2} title="Install the SDK" code="npm install errorhub" desc="Drop the SDK into your application. Point it at your API key. It wraps your app and starts listening automatically." />
          <Step num={3} title="Errors appear instantly" desc="Throw an exception in production. Watch it appear in your dashboard within seconds — with full stack trace and context." />
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <FeaturesSection />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}