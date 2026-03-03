import { useEffect, useState } from "react";
import { Users, Github, AlertCircle, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { getTeams } from "@/services/buddyBotApi";
import type { BuddyBotTeam } from "@/types/buddyBot";

export default function BuddyBot() {
  const [teams, setTeams] = useState<BuddyBotTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTeams()
      .then(setTeams)
      .catch((err) => setError(err?.message ?? "Failed to load teams"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-7 h-7 text-neutral-700" />
          <h1 className="text-2xl font-semibold text-neutral-900">
            Coding Buddies
          </h1>
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
          <TeamBuddiesTable key={team.name} team={team} />
        ))}
      </main>
    </>
  );
}

function TeamBuddiesTable({ team }: { team: BuddyBotTeam }) {
  const buddyEntries = Object.entries(team.buddies ?? {});

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-base font-semibold text-neutral-800">
          {team.name}
        </h2>
        <span className="text-xs text-neutral-400 bg-neutral-100 rounded-full px-2 py-0.5">
          {buddyEntries.length} assignment{buddyEntries.length !== 1 ? "s" : ""}
        </span>
      </div>

      {buddyEntries.length === 0 ? (
        <p className="text-sm text-neutral-400 pl-1">
          No buddy assignments defined.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left px-4 py-3 font-medium text-neutral-500 w-8">
                  #
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5" /> Reviewer
                  </span>
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5" /> Buddy
                  </span>
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-500">
                  Discord (Reviewer)
                </th>
                <th className="text-left px-4 py-3 font-medium text-neutral-500">
                  Discord (Buddy)
                </th>
              </tr>
            </thead>
            <tbody>
              {buddyEntries.map(([reviewer, buddy], index) => (
                <tr
                  key={reviewer}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-4 py-3 text-neutral-400 tabular-nums">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <GithubUser username={reviewer} />
                  </td>
                  <td className="px-4 py-3">
                    <GithubUser username={buddy} />
                  </td>
                  <td className="px-4 py-3">
                    <DiscordUser username={team.username_mappings[reviewer]} />
                  </td>
                  <td className="px-4 py-3">
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

function GithubUser({ username }: { username: string }) {
  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-medium text-neutral-800 hover:text-blue-600 transition-colors"
    >
      <img
        src={`https://github.com/${username}.png?size=24`}
        alt={username}
        className="w-5 h-5 rounded-full bg-neutral-200"
      />
      {username}
    </a>
  );
}

function DiscordUser({ username }: { username: string | undefined }) {
  if (!username) {
    return <span className="text-neutral-300">—</span>;
  }
  return <span className="text-neutral-700">@{username}</span>;
}
