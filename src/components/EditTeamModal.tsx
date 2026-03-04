import { useState } from "react";
import { X, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { putTeam } from "@/services/buddyBotApi";
import type { BuddyBotTeam } from "@/types/buddyBot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditTeamModalProps {
  team: BuddyBotTeam;
  onClose: () => void;
  onUpdated: (team: BuddyBotTeam) => void;
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

function toRepoStrings(repos: BuddyBotTeam["repositories"]): string[] {
  const strings = repos.map((r) => (typeof r === "string" ? r : r.name));
  return strings.length > 0 ? strings : [""];
}

export function EditTeamModal({
  team,
  onClose,
  onUpdated,
}: EditTeamModalProps) {
  const [discordWebhook, setDiscordWebhook] = useState(
    team.discord_webhook_url,
  );
  const [repositories, setRepositories] = useState<string[]>(
    toRepoStrings(team.repositories),
  );
  const [buddyRows, setBuddyRows] = useState<BuddyRow[]>(() => {
    const entries = Object.entries(team.buddies ?? {});
    return entries.length > 0
      ? entries.map(([github, buddy]) => ({ id: nextId(), github, buddy }))
      : [{ id: nextId(), github: "", buddy: "" }];
  });
  const [mappingRows, setMappingRows] = useState<MappingRow[]>(() => {
    const entries = Object.entries(team.username_mappings ?? {});
    return entries.length > 0
      ? entries.map(([github, discord]) => ({ id: nextId(), github, discord }))
      : [{ id: nextId(), github: "", discord: "" }];
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Repositories
  const updateRepo = (index: number, value: string) =>
    setRepositories((prev) => prev.map((r, i) => (i === index ? value : r)));
  const addRepo = () => setRepositories((prev) => [...prev, ""]);
  const removeRepo = (index: number) =>
    setRepositories((prev) => prev.filter((_, i) => i !== index));

  // Buddy rows
  const updateBuddyRow = (
    id: number,
    field: "github" | "buddy",
    value: string,
  ) =>
    setBuddyRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  const addBuddyRow = () =>
    setBuddyRows((prev) => [...prev, { id: nextId(), github: "", buddy: "" }]);
  const removeBuddyRow = (id: number) =>
    setBuddyRows((prev) => prev.filter((r) => r.id !== id));

  // Mapping rows
  const updateMappingRow = (
    id: number,
    field: "github" | "discord",
    value: string,
  ) =>
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
      const updated = await putTeam(team.name, {
        ...team,
        discord_webhook_url: discordWebhook.trim(),
        repositories: repositories.map((r) => r.trim()).filter(Boolean),
        buddies,
        username_mappings,
      });
      setSuccess(true);
      onUpdated(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update team");
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
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold">Edit Team</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success state */}
        {success && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="p-3 bg-green-50 rounded-full">
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="text-base font-semibold">
                  Team "{team.name}" updated!
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-4 border-t border-border bg-muted/30 rounded-b-2xl">
              <Button onClick={onClose}>Done</Button>
            </div>
          </>
        )}

        {/* Form */}
        {!success && (
          <form
            id="edit-team-form"
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
          >
            {error && (
              <p
                className="text-sm text-red-600 wrap-break-word whitespace-pre-wrap"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Basic info */}
            <fieldset className="space-y-4">
              <legend className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Basic Info
              </legend>
              <div className="grid gap-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input id="team-name" value={team.name} disabled readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discord-webhook">
                  Discord Webhook URL{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="discord-webhook"
                  required
                  type="url"
                  value={discordWebhook}
                  onChange={(e) => setDiscordWebhook(e.target.value)}
                  placeholder="https://discord.com/api/webhooks/…"
                />
              </div>
            </fieldset>

            {/* Repositories */}
            <fieldset className="space-y-3">
              <legend className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Repositories
              </legend>
              <div className="space-y-2">
                {repositories.map((repo, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={repo}
                      onChange={(e) => updateRepo(i, e.target.value)}
                      placeholder="org/repo-name"
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
              <legend className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Buddy Assignments
              </legend>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-x-2 gap-y-2 items-center">
                <span className="text-xs text-muted-foreground font-medium">
                  Reviewer
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  Buddy
                </span>
                <span />
                {buddyRows.map((row) => (
                  <>
                    <Input
                      key={`gh-${row.id}`}
                      value={row.github}
                      onChange={(e) =>
                        updateBuddyRow(row.id, "github", e.target.value)
                      }
                      placeholder="github-user"
                    />
                    <Input
                      key={`bd-${row.id}`}
                      value={row.buddy}
                      onChange={(e) =>
                        updateBuddyRow(row.id, "buddy", e.target.value)
                      }
                      placeholder="github-user"
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
              <legend className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Username Mappings
              </legend>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-x-2 gap-y-2 items-center">
                <span className="text-xs text-muted-foreground font-medium">
                  GitHub
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  Discord
                </span>
                <span />
                {mappingRows.map((row) => (
                  <>
                    <Input
                      key={`gh-${row.id}`}
                      value={row.github}
                      onChange={(e) =>
                        updateMappingRow(row.id, "github", e.target.value)
                      }
                      placeholder="github-user"
                    />
                    <Input
                      key={`dc-${row.id}`}
                      value={row.discord}
                      onChange={(e) =>
                        updateMappingRow(row.id, "discord", e.target.value)
                      }
                      placeholder="discord-user"
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
          </form>
        )}

        {/* Footer */}
        {!success && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30 rounded-b-2xl">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-team-form"
              disabled={submitting}
              className="bg-[#0078E8] hover:bg-[#0058A9] text-white"
            >
              {submitting ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const removeButtonClass =
  "flex items-center justify-center w-8 h-8 shrink-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors";

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
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
