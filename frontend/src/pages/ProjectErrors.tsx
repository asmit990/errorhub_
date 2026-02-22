import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectErrors } from "@/api/errors";
import { getProject } from "@/api/projects";
import Navbar from "@/components/Navbar";
import type { ErrorEntry } from "@/types/error";
import type { Project } from "@/types/project";
import { ArrowLeft, AlertTriangle, Activity, FileCode2, Globe } from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

const parseTimestamp = (value: unknown): Date | null => {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  const num =
    typeof value === "string" ? Number(value) :
    typeof value === "number" ? value :
    NaN;

  if (Number.isNaN(num)) return null;
  return new Date(num);
};

/** Relative time: "2s ago", "4m ago", "3h ago", etc. */
const relativeTime = (date: Date): string => {
  const diffMs = Date.now() - date.getTime();
  const s = Math.floor(diffMs / 1000);
  if (s < 60)   return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  return date.toLocaleDateString();
};

/** Full timestamp for tooltip / secondary display */
const fullTimestamp = (date: Date): string =>
  date.toLocaleString(undefined, {
    year:   "numeric",
    month:  "short",
    day:    "numeric",
    hour:   "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

// ─── colour rules ────────────────────────────────────────────────────────────

type EnvName = "production" | "staging" | "development" | string;

const envStyle = (env: EnvName) => {
  const e = env.toLowerCase();
  if (e === "production")  return { dot: "#ef4444", badge: "bg-red-900/60 text-red-300 border border-red-700/50" };
  if (e === "staging")     return { dot: "#f59e0b", badge: "bg-amber-900/60 text-amber-300 border border-amber-700/50" };
  return                          { dot: "#3b82f6", badge: "bg-blue-900/60 text-blue-300 border border-blue-700/50" };
};

const occurrenceColor = (count: number) => {
  if (count >= 100) return "text-red-400";
  if (count >= 10)  return "text-amber-400";
  return "text-blue-400";
};

// ─── component ───────────────────────────────────────────────────────────────

const ProjectErrors = () => {
  const { id } = useParams<{ id?: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [errors,  setErrors]  = useState<ErrorEntry[]>([]);
  const [count,   setCount]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setErrorMsg("Invalid project id");
      return;
    }

    const load = async () => {
      try {
        const [p, errRes] = await Promise.all([getProject(id), getProjectErrors(id)]);
        setProject(p);
        setErrors(Array.isArray(errRes.data) ? errRes.data : []);
        setCount(typeof errRes.count === "number" ? errRes.count : 0);
      } catch (err: any) {
        setErrorMsg(err?.message || "Failed to load errors");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // ── derived stats ──────────────────────────────────────────────────────────
  const affectedFiles  = new Set(errors.map((e) => e.filename).filter(Boolean)).size;
  const environments   = new Set(errors.map((e) => (e as any).environment).filter(Boolean)).size;
  const errorsPerHour  = count; // adjust if you have a real rate

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6 font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          back to dashboard
        </Link>

        {loading ? (
          <p className="text-zinc-500 font-mono text-sm animate-pulse">Loading…</p>
        ) : errorMsg ? (
          <p className="text-red-400 font-mono text-sm">{errorMsg}</p>
        ) : (
          <>
            {/* ── header bar ──────────────────────────────────────────── */}
            <div
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-5 mb-4"
              style={{ backdropFilter: "blur(8px)" }}
            >
              {/* breadcrumb + live pill */}
              <div className="flex items-center justify-between mb-5">
                <p className="font-mono text-sm">
                  <span className="text-emerald-400 font-semibold">errorhub</span>
                  <span className="text-zinc-600 mx-2">/</span>
                  <span className="text-zinc-300">{project?.name ?? id}</span>
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  live
                </span>
              </div>

              {/* stat row */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold font-mono text-red-400">
                    {errorsPerHour.toLocaleString()}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-mono flex items-center gap-1.5">
                    <Activity className="w-3 h-3" /> errors / 1h
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-mono text-zinc-100">
                    {affectedFiles}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-mono flex items-center gap-1.5">
                    <FileCode2 className="w-3 h-3" /> affected files
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-mono text-zinc-400">
                    {environments}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-mono flex items-center gap-1.5">
                    <Globe className="w-3 h-3" /> environments
                  </p>
                </div>
              </div>
            </div>

            {/* ── error list ──────────────────────────────────────────── */}
            {errors.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 p-12 text-center">
                <AlertTriangle className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm font-mono">
                  No errors yet. Integrate the SDK to start capturing.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800/80">
                {errors.map((err, i) => {
                  const ts        = parseTimestamp(err.timestamp ?? (err as any).created_at);
                  const env       = (err as any).environment as EnvName | undefined;
                  const style     = env ? envStyle(env) : null;
                  const occCount  = (err as any).count as number | undefined;
                  const errId     = (err as any).error_id ?? `ERR-${String(i + 1).padStart(4, "0")}`;

                  return (
                    <div
                      key={err.id}
                      className="group relative px-5 py-4 bg-zinc-900/40 hover:bg-zinc-800/50 transition-colors"
                      style={
                        env?.toLowerCase() === "production" && i === 0
                          ? { borderLeft: "3px solid #22c55e" }
                          : { borderLeft: "3px solid transparent" }
                      }
                    >
                      {/* top row: id + env badge + time + count */}
                      <div className="flex items-center justify-between gap-4 mb-1.5">
                        <div className="flex items-center gap-2">
                          {/* coloured dot */}
                          {style && (
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: style.dot }}
                            />
                          )}
                          {/* error id */}
                          <span className="font-mono text-xs text-zinc-500">{errId}</span>
                          {/* env badge */}
                          {env && (
                            <span
                              className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${style!.badge} uppercase tracking-widest`}
                            >
                              {env}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                          {/* relative time — always visible */}
                          {ts ? (
                            <span
                              className="font-mono text-xs text-zinc-400"
                              title={fullTimestamp(ts)}
                            >
                              {relativeTime(ts)}
                            </span>
                          ) : (
                            <span className="font-mono text-xs text-zinc-600">no time</span>
                          )}
                          {/* occurrence count */}
                          {occCount !== undefined && (
                            <span className={`font-mono text-xs font-bold ${occurrenceColor(occCount)}`}>
                              ×{occCount}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* error message */}
                      <p className="font-mono text-sm text-zinc-100 break-all leading-snug">
                        {err.message ?? "Unknown error"}
                      </p>

                      {/* file + line */}
                      {(err.filename || err.lineno != null) && (
                        <p className="font-mono text-xs text-zinc-500 mt-1">
                          {err.filename}
                          {err.lineno != null && (
                            <span className="text-zinc-600">
                              :{err.lineno}{err.colno != null ? `:${err.colno}` : ""}
                            </span>
                          )}
                        </p>
                      )}

                      {/* full timestamp on hover — secondary line */}
                      {ts && (
                        <p className="font-mono text-[10px] text-zinc-600 mt-1.5">
                          {fullTimestamp(ts)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectErrors;