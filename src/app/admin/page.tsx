"use client";

import { useState, useEffect } from "react";

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
}

export default function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASS || "sovereign2026")) {
      setAuthed(true);
      fetchEntries();
    }
  };

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/waitlist");
      const data = await res.json();
      setEntries(data.entries || []);
      setTotal(data.total || 0);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchEntries();
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <form onSubmit={login} className="w-full max-w-sm space-y-4">
          <h1 className="text-xl font-semibold text-white text-center">
            Sovereign Admin
          </h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Waitlist Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-1">
              {total} total signups
            </p>
          </div>
          <button
            onClick={fetchEntries}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-zinc-500">Total signups</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-2xl font-bold">
              {entries.filter((e) => {
                const d = new Date(e.timestamp);
                const now = new Date();
                return d.toDateString() === now.toDateString();
              }).length}
            </div>
            <div className="text-xs text-zinc-500">Today</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-2xl font-bold">
              {entries.filter((e) => e.source === "landing").length}
            </div>
            <div className="text-xs text-zinc-500">From landing</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-2xl font-bold">
              {entries.filter((e) => e.source === "referral").length}
            </div>
            <div className="text-xs text-zinc-500">From referrals</div>
          </div>
        </div>

        {/* Entries table */}
        {loading ? (
          <div className="text-center text-zinc-500 py-12">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center text-zinc-500 py-12">
            No signups yet. Share the link!
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/30">
                  <th className="text-left p-3 font-medium text-zinc-400">
                    #
                  </th>
                  <th className="text-left p-3 font-medium text-zinc-400">
                    Email
                  </th>
                  <th className="text-left p-3 font-medium text-zinc-400 hidden sm:table-cell">
                    Source
                  </th>
                  <th className="text-left p-3 font-medium text-zinc-400 hidden sm:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {entries.map((entry, i) => (
                  <tr
                    key={entry.email}
                    className="hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="p-3 text-zinc-500">{i + 1}</td>
                    <td className="p-3 font-mono text-xs">{entry.email}</td>
                    <td className="p-3 text-zinc-500 hidden sm:table-cell">
                      <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs">
                        {entry.source}
                      </span>
                    </td>
                    <td className="p-3 text-zinc-500 text-xs hidden sm:table-cell">
                      {new Date(entry.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Export */}
        {entries.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                const csv =
                  "email,source,timestamp\n" +
                  entries
                    .map(
                      (e) => `${e.email},${e.source},${e.timestamp}`
                    )
                    .join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `sovereign-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
                a.click();
              }}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              Export CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
