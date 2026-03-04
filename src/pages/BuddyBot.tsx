import { useEffect, useState } from "react";
import {
  Users,
  Github,
  AlertCircle,
  Loader2,
  ExternalLink,
  Plus,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AddTeamModal } from "@/components/AddTeamModal";
import { EditTeamModal } from "@/components/EditTeamModal";
import { Button } from "@/components/ui/button";
import { getTeams, deleteTeam } from "@/services/buddyBotApi";
import type { BuddyBotTeam } from "@/types/buddyBot";

export default function BuddyBot() {
  const [teams, setTeams] = useState<BuddyBotTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [teamToEdit, setTeamToEdit] = useState<BuddyBotTeam | null>(null);

  useEffect(() => {
    getTeams()
      .then(setTeams)
      .catch((err) => setError(err?.message ?? "Failed to load teams"))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteConfirm = async () => {
    if (!teamToDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteTeam(teamToDelete);
      setTeams((prev) => prev.filter((t) => t.name !== teamToDelete));
      setTeamToDelete(null);
    } catch (err: unknown) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete team",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-100 rounded-lg">
              <Users className="w-6 h-6 text-neutral-700" />
            </div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Coding Buddies
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#0078E8] hover:bg-[#0058A9] text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Team
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-neutral-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading teams…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {!loading && !error && teams.length === 0 && (
          <p className="text-sm text-neutral-500">No teams configured yet.</p>
        )}

        {teams.map((team) => (
          <TeamBuddiesTable
            key={team.name}
            team={team}
            onEdit={() => setTeamToEdit(team)}
            onDelete={() => setTeamToDelete(team.name)}
          />
        ))}
      </main>

      {showModal && (
        <AddTeamModal
          onClose={() => setShowModal(false)}
          onCreated={(team) => {
            setTeams((prev) => [...prev, team]);
            setShowModal(false);
          }}
        />
      )}

      {teamToDelete && (
        <DeleteTeamModal
          teamName={teamToDelete}
          deleting={deleting}
          error={deleteError}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setTeamToDelete(null);
            setDeleteError(null);
          }}
        />
      )}

      {teamToEdit && (
        <EditTeamModal
          team={teamToEdit}
          onClose={() => setTeamToEdit(null)}
          onUpdated={(updated) => {
            setTeams((prev) =>
              prev.map((t) => (t.name === updated.name ? updated : t)),
            );
            setTeamToEdit(null);
          }}
        />
      )}
    </>
  );
}

function TeamBuddiesTable({
  team,
  onEdit,
  onDelete,
}: {
  team: BuddyBotTeam;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const buddyEntries = Object.entries(team.buddies ?? {});
  const firstRepo = team.repositories?.[0];
  const repoName = typeof firstRepo === "string" ? firstRepo : firstRepo?.name;
  const teamRepoUrl = repoName
    ? `https://github.com/stevensblueprint/${repoName}`
    : null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {teamRepoUrl ? (
            <a
              href={teamRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-2 py-1 -ml-2 rounded-md hover:bg-neutral-50 transition-all"
            >
              <h2 className="text-lg font-bold text-neutral-900 group-hover:text-blue-600">
                {team.name}
              </h2>
              <ExternalLink className="w-4 h-4 text-neutral-300 group-hover:text-blue-400" />
            </a>
          ) : (
            <h2 className="text-lg font-bold text-neutral-900">{team.name}</h2>
          )}

          <span className="text-xs font-medium text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-full px-2.5 py-0.5">
            {buddyEntries.length} Pairings
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>

      {buddyEntries.length === 0 ? (
        <p className="text-sm text-neutral-400 pl-1 italic">
          No buddy assignments defined.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-neutral-600 w-12 text-center">
                  #
                </th>
                <th className="px-6 py-3 font-semibold text-neutral-600">
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4" /> Reviewer
                  </span>
                </th>
                <th className="px-6 py-3 font-semibold text-neutral-600">
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4" /> Buddy
                  </span>
                </th>
                <th className="px-6 py-3 font-semibold text-neutral-600">
                  Discord (Reviewer)
                </th>
                <th className="px-6 py-3 font-semibold text-neutral-600">
                  Discord (Buddy)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white">
              {buddyEntries.map(([reviewer, buddy], index) => (
                <tr
                  key={reviewer}
                  className="hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="px-4 py-4 text-neutral-400 text-center font-mono">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <GithubUser username={reviewer} />
                  </td>
                  <td className="px-6 py-4">
                    <GithubUser username={buddy} />
                  </td>
                  <td className="px-6 py-4">
                    <DiscordUser username={team.username_mappings[reviewer]} />
                  </td>
                  <td className="px-6 py-4">
                    <DiscordUser username={team.username_mappings[buddy]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function DeleteTeamModal({
  teamName,
  deleting,
  error,
  onConfirm,
  onCancel,
}: {
  teamName: string;
  deleting: boolean;
  error: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-border">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold">Delete Team</h2>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">"{teamName}"</span>?
            This action cannot be undone.
          </p>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30 rounded-b-2xl">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            variant="destructive"
          >
            {deleting ? "Deleting…" : "Delete Team"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function GithubUser({ username }: { username: string }) {
  return (
    <div className="flex items-center w-full max-w-40">
      {" "}
      {/* Fixed container width ensures alignment */}
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
      >
        <img
          src={`https://github.com/${username}.png?size=32`}
          alt={username}
          className="w-6 h-6 rounded-md bg-neutral-200 ring-1 ring-neutral-200 group-hover:ring-blue-400 transition-all shrink-0"
        />
        <span className="font-medium text-neutral-700 group-hover:text-blue-600 truncate">
          {username}
        </span>
      </a>
    </div>
  );
}

function DiscordUser({ username }: { username: string | undefined }) {
  if (!username) {
    return <span className="text-neutral-300 select-none">—</span>;
  }
  return (
    <span className="text-neutral-600 font-mono bg-neutral-50 px-2 py-1 rounded border border-neutral-100 text-[13px]">
      @{username}
    </span>
  );
}
