import { useState } from "react";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import { createTeam } from "@/services/buddyBotApi";
import type { BuddyBotTeam } from "@/types/buddyBot";

interface AddTeamModalProps {
  onClose: () => void;
  onCreated: (team: BuddyBotTeam) => void;
}

interface BuddyRow {
  id: number;
  github: string;
  buddy: string;
}

interface MappingRow {
  id: number;
  github: string;
  discord: string;
}

let rowId = 0;
const nextId = () => ++rowId;

export function AddTeamModal({ onClose, onCreated }: AddTeamModalProps) {
  const [name, setName] = useState("");
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [repositories, setRepositories] = useState<string[]>([""]);
  const [buddyRows, setBuddyRows] = useState<BuddyRow[]>([
    { id: nextId(), github: "", buddy: "" },
  ]);
  const [mappingRows, setMappingRows] = useState<MappingRow[]>([
    { id: nextId(), github: "", discord: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Repositories
  const updateRepo = (index: number, value: string) =>
    setRepositories((prev) => prev.map((r, i) => (i === index ? value : r)));
  const addRepo = () => setRepositories((prev) => [...prev, ""]);
  const removeRepo = (index: number) =>
    setRepositories((prev) => prev.filter((_, i) => i !== index));

  // Buddy rows
  const updateBuddyRow = (id: number, field: "github" | "buddy", value: string) =>
    setBuddyRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  const addBuddyRow = () =>
    setBuddyRows((prev) => [...prev, { id: nextId(), github: "", buddy: "" }]);
  const removeBuddyRow = (id: number) =>
    setBuddyRows((prev) => prev.filter((r) => r.id !== id));

  // Mapping rows
  const updateMappingRow = (id: number, field: "github" | "discord", value: string) =>
    setMappingRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  const addMappingRow = () =>
    setMappingRows((prev) => [
      ...prev,
      { id: nextId(), github: "", discord: "" },
    ]);
  const removeMappingRow = (id: number) =>
    setMappingRows((prev) => prev.filter((r) => r.id !== id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const buddies = Object.fromEntries(
      buddyRows
        .filter((r) => r.github.trim() && r.buddy.trim())
        .map((r) => [r.github.trim(), r.buddy.trim()]),
    );

    const username_mappings = Object.fromEntries(
      mappingRows
        .filter((r) => r.github.trim() && r.discord.trim())
        .map((r) => [r.github.trim(), r.discord.trim()]),
    );

    setSubmitting(true);
    try {
      const team = await createTeam({
        name: name.trim(),
        discord_webhook_url: discordWebhook.trim(),
        repositories: repositories.map((r) => r.trim()).filter(Boolean),
        buddies,
        username_mappings,
      });
      onCreated(team);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to create team";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900">
            New Team Config
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <form
          id="add-team-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
        >
          {/* Basic info */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Basic Info
            </legend>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">
                Team Name <Required />
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. GenXL"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">
                Discord Webhook URL <Required />
              </label>
              <input
                required
                type="url"
                value={discordWebhook}
                onChange={(e) => setDiscordWebhook(e.target.value)}
                placeholder="https://discord.com/api/webhooks/…"
                className={inputClass}
              />
            </div>
          </fieldset>

          {/* Repositories */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Repositories
            </legend>
            <div className="space-y-2">
              {repositories.map((repo, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={repo}
                    onChange={(e) => updateRepo(i, e.target.value)}
                    placeholder="org/repo-name"
                    className={inputClass}
                  />
                  {repositories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRepo(i)}
                      className={removeButtonClass}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <AddRowButton onClick={addRepo} label="Add repository" />
          </fieldset>

          {/* Buddies */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Buddy Assignments
            </legend>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-x-2 gap-y-2 items-center">
              <span className="text-xs text-neutral-400 font-medium">
                Reviewer
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                Buddy
              </span>
              <span />
              {buddyRows.map((row) => (
                <>
                  <input
                    key={`gh-${row.id}`}
                    value={row.github}
                    onChange={(e) =>
                      updateBuddyRow(row.id, "github", e.target.value)
                    }
                    placeholder="github-user"
                    className={inputClass}
                  />
                  <input
                    key={`bd-${row.id}`}
                    value={row.buddy}
                    onChange={(e) =>
                      updateBuddyRow(row.id, "buddy", e.target.value)
                    }
                    placeholder="github-user"
                    className={inputClass}
                  />
                  <button
                    key={`rm-${row.id}`}
                    type="button"
                    onClick={() => removeBuddyRow(row.id)}
                    disabled={buddyRows.length === 1}
                    className={removeButtonClass}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              ))}
            </div>
            <AddRowButton onClick={addBuddyRow} label="Add buddy pair" />
          </fieldset>

          {/* Username mappings */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Username Mappings
            </legend>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-x-2 gap-y-2 items-center">
              <span className="text-xs text-neutral-400 font-medium">
                GitHub
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                Discord
              </span>
              <span />
              {mappingRows.map((row) => (
                <>
                  <input
                    key={`gh-${row.id}`}
                    value={row.github}
                    onChange={(e) =>
                      updateMappingRow(row.id, "github", e.target.value)
                    }
                    placeholder="github-user"
                    className={inputClass}
                  />
                  <input
                    key={`dc-${row.id}`}
                    value={row.discord}
                    onChange={(e) =>
                      updateMappingRow(row.id, "discord", e.target.value)
                    }
                    placeholder="discord-user"
                    className={inputClass}
                  />
                  <button
                    key={`rm-${row.id}`}
                    type="button"
                    onClick={() => removeMappingRow(row.id)}
                    disabled={mappingRows.length === 1}
                    className={removeButtonClass}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              ))}
            </div>
            <AddRowButton onClick={addMappingRow} label="Add mapping" />
          </fieldset>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-team-form"
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-700 disabled:opacity-50 rounded-lg transition-colors"
          >
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {submitting ? "Creating…" : "Create Team"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Small helpers

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition";

const removeButtonClass =
  "flex items-center justify-center w-8 h-8 shrink-0 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors";

function Required() {
  return <span className="text-red-400">*</span>;
}

function AddRowButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
