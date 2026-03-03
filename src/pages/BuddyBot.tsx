import { useEffect, useState } from "react";
import {
  Users,
  Github,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
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
          <div className="p-2 bg-neutral-100 rounded-lg">
            <Users className="w-6 h-6 text-neutral-700" />
          </div>
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

  // Logic to get the first repo link
  const firstRepo = team.repositories?.[0];
  const repoName = typeof firstRepo === "string" ? firstRepo : firstRepo?.name;
  const teamRepoUrl = repoName
    ? `https://github.com/stevensblueprint/${repoName}`
    : null;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
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
