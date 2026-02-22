import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "@/api/auth";
import { getProjects, createProject, deleteProject } from "@/api/projects";
import Navbar from "@/components/Navbar";
import ApiKeyModal from "@/components/ApiKeyModal";
import type { User } from "@/types/auth";
import type { Project } from "@/types/project";
import { FolderOpen, Plus, ChevronRight, Bug, Trash2, X, AlertTriangle } from "lucide-react";

const PROJECT_LIMIT = 5;

// ─── tiny confirm modal ──────────────────────────────────────────────────────
const DeleteConfirmModal = ({
  project,
  onConfirm,
  onCancel,
  deleting,
}: {
  project: Project;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* backdrop */}
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={onCancel}
    />

    {/* modal */}
    <div className="relative z-10 w-full max-w-sm mx-4 rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-red-900/50 border border-red-700/50 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <h3 className="font-mono text-sm font-semibold text-zinc-100">
            Delete project
          </h3>
          <p className="font-mono text-xs text-zinc-400 mt-1 leading-relaxed">
            <span className="text-zinc-200">{project.name}</span> and all its
            captured errors will be permanently removed. This cannot be undone.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="ml-auto text-zinc-600 hover:text-zinc-300 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          disabled={deleting}
          className="font-mono text-xs px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={deleting}
          className="font-mono text-xs px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center gap-1.5 disabled:opacity-60"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

// ─── main component ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser]       = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [projectName, setProjectName] = useState("");
  const [creating, setCreating]       = useState(false);
  const [createdApiKey, setCreatedApiKey] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);

  // delete state
  const [confirmTarget, setConfirmTarget] = useState<Project | null>(null);
  const [deleting, setDeleting]           = useState(false);
  const [deleteError, setDeleteError]     = useState<string | null>(null);

  // ── load ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [u, p] = await Promise.all([getMe(), getProjects()]);
        setUser(u);
        setProjects(p);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── create ──────────────────────────────────────────────────────────────────
  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setCreating(true);
    setCreateError(null);

    try {
      const project = await createProject({ name: projectName.trim() });
      if (project.api_key) setCreatedApiKey(project.api_key);
      setProjects((prev) => [project, ...prev]);
      setProjectName("");
    } catch (err: any) {
      setCreateError(err?.message || "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  // ── delete ──────────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!confirmTarget) return;
    setDeleting(true);
    setDeleteError(null);

    try {
      await deleteProject(confirmTarget.id);
      setProjects((prev) => prev.filter((p) => p.id !== confirmTarget.id));
      setConfirmTarget(null);
    } catch (err: any) {
      setDeleteError(err?.message || "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  const limitReached = projects.length >= PROJECT_LIMIT;

  // ── loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-zinc-500 font-mono text-sm animate-pulse">Loading…</p>
        </div>
      </div>
    );
  }

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* ── user card ───────────────────────────────────────────────── */}
        {user && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-5 mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-mono text-base font-semibold text-zinc-100">
                Welcome back,{" "}
                <span className="text-emerald-400">{user.name}</span>
              </h1>
              <p className="font-mono text-xs text-zinc-500 mt-0.5">
                {user.email}
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] px-2 py-1 rounded border border-zinc-700 text-zinc-400 uppercase tracking-widest block mb-1">
                {user.role}
              </span>
              <p className="font-mono text-xs text-zinc-600">
                {projects.length}/{PROJECT_LIMIT} projects
              </p>
            </div>
          </div>
        )}

        {/* ── create form ─────────────────────────────────────────────── */}
        <div className="mb-6">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
            New project
          </p>

          <form onSubmit={handleCreate} className="flex gap-2">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="project-name"
              disabled={limitReached}
              required
              className="
                flex-1 font-mono text-sm bg-zinc-900 border border-zinc-700
                rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600
                focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30
                disabled:opacity-40 transition-colors
              "
            />
            <button
              type="submit"
              disabled={creating || limitReached}
              className="
                font-mono text-xs px-4 py-2.5 rounded-lg
                bg-emerald-600 hover:bg-emerald-500
                text-white flex items-center gap-1.5
                disabled:opacity-50 transition-colors
              "
            >
              <Plus className="w-3.5 h-3.5" />
              {creating ? "Creating…" : "Create"}
            </button>
          </form>

          {limitReached && (
            <p className="font-mono text-xs text-amber-500 mt-2">
              Project limit of {PROJECT_LIMIT} reached.
            </p>
          )}
          {createError && (
            <p className="font-mono text-xs text-red-400 mt-2">{createError}</p>
          )}
          {deleteError && (
            <p className="font-mono text-xs text-red-400 mt-2">{deleteError}</p>
          )}
        </div>

        {/* ── project list ────────────────────────────────────────────── */}
        <div>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Your projects
          </p>

          {projects.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 p-12 text-center">
              <FolderOpen className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
              <p className="font-mono text-xs text-zinc-600">
                No projects yet. Create one above.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800/80">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="group flex items-center bg-zinc-900/40 hover:bg-zinc-800/50 transition-colors"
                >
                  {/* main clickable area */}
                  <button
                    onClick={() => navigate(`/projects/${p.id}/errors`)}
                    className="flex-1 flex items-center gap-3 px-5 py-4 text-left"
                  >
                    <Bug className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-sm text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {p.name}
                      </p>
                      <p className="font-mono text-xs text-zinc-600 mt-0.5">
                        created {new Date(p.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </button>

                  {/* delete button — appears on hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteError(null);
                      setConfirmTarget(p);
                    }}
                    className="
                      opacity-0 group-hover:opacity-100
                      mr-3 p-2 rounded-lg
                      text-zinc-600 hover:text-red-400 hover:bg-red-900/30
                      transition-all duration-150
                    "
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <ChevronRight
                    className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors mr-4 flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── modals ──────────────────────────────────────────────────────── */}
      {createdApiKey && (
        <ApiKeyModal
          apiKey={createdApiKey}
          onClose={() => setCreatedApiKey(null)}
        />
      )}

      {confirmTarget && (
        <DeleteConfirmModal
          project={confirmTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => { setConfirmTarget(null); setDeleteError(null); }}
          deleting={deleting}
        />
      )}
    </div>
  );
};

export default Dashboard;