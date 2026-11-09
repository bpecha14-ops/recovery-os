"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  KeyRound,
  Loader2,
  Database,
  Users,
  Building2,
  Globe2,
  Lock,
} from "lucide-react";

type Row = Record<string, unknown>;
type TableKey = "people-scans" | "waitlist" | "scan-runs";

interface ExportPayload {
  stats: {
    peopleScans: number;
    waitlist: number;
    scanRuns: number;
    registry: {
      countries: number;
      sources: number;
      verifiedUSDBillions: number;
    };
    exportedAt: string;
  };
  data: Record<string, Row[]>;
}

const TABLE_LABELS: Record<TableKey, string> = {
  "people-scans": "People searches",
  waitlist: "Waitlist",
  "scan-runs": "Business scans",
};

const CELL_KEYS: Record<TableKey, string[]> = {
  "people-scans": ["createdAt", "fullName", "email", "countries", "matches"],
  waitlist: ["createdAt", "email", "company", "volume", "channels"],
  "scan-runs": ["createdAt", "rowsParsed", "matchesFound", "estimateLow", "estimateHigh"],
};

const HEADER_LABELS: Record<string, string> = {
  createdAt: "Created at",
  fullName: "Name",
  email: "Email",
  countries: "Countries",
  matches: "Matches",
  company: "Company",
  volume: "Volume",
  channels: "Channels",
  rowsParsed: "Rows",
  matchesFound: "Matches",
  estimateLow: "Est. low",
  estimateHigh: "Est. high",
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [payload, setPayload] = useState<ExportPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<TableKey>("people-scans");

  const load = useCallback(async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/export?token=${encodeURIComponent(t)}&format=json`);
      if (res.status === 401) {
        setError("Wrong token.");
        setAuthed(false);
        return;
      }
      if (!res.ok) {
        setError(`Export failed (${res.status}).`);
        return;
      }
      const json = (await res.json()) as ExportPayload;
      setPayload(json);
      setAuthed(true);
      localStorage.setItem("recoveryos-admin-token", t);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("recoveryos-admin-token");
    if (saved) {
      setToken(saved);
      void load(saved);
    }
  }, [load]);

  const downloadCsv = (table: TableKey) => {
    const url = `/api/admin/export?token=${encodeURIComponent(token)}&format=csv&table=${table}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = `recoveryos-${table}.csv`;
    a.click();
  };

  const rows = payload?.data?.[tab] ?? [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600">
            <Database className="h-4.5 w-4.5 text-zinc-950" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              RecoveryOS — Founder Console
            </h1>
            <p className="text-xs text-zinc-500">
              Everything the platform has collected. Data lives in SQLite (db/custom.db).
            </p>
          </div>
        </div>

        {/* Token gate */}
        {!authed ? (
          <form
            className="panel-black mt-10 max-w-md rounded-2xl p-6"
            onSubmit={(e) => {
              e.preventDefault();
              void load(token);
            }}
          >
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
              <KeyRound className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Admin token
            </label>
            <Input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ADMIN_TOKEN from .env"
              className="mt-3 border-amber-400/[0.16] bg-black/50 text-amber-100 focus-visible:ring-amber-400/50"
            />
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            <Button
              type="submit"
              disabled={loading || token.length === 0}
              className="mt-4 w-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 hover:brightness-110"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              Unlock
            </Button>
          </form>
        ) : (
          <>
            {/* Stats */}
            {payload && (
              <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  {
                    icon: Users,
                    label: "People searches",
                    value: payload.stats.peopleScans.toLocaleString("en-US"),
                  },
                  {
                    icon: Building2,
                    label: "Waitlist entries",
                    value: payload.stats.waitlist.toLocaleString("en-US"),
                  },
                  {
                    icon: Database,
                    label: "Business scan runs",
                    value: payload.stats.scanRuns.toLocaleString("en-US"),
                  },
                  {
                    icon: Globe2,
                    label: `Registry · $${payload.stats.registry.verifiedUSDBillions}B verified`,
                    value: `${payload.stats.registry.countries} countries · ${payload.stats.registry.sources} sources`,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="panel-black rounded-xl p-4"
                  >
                    <s.icon className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    <p className="tabular mt-2 text-lg font-bold text-white">
                      {s.value}
                    </p>
                    <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tabs + CSV */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-full border border-amber-400/[0.14] bg-black/60 p-1">
                {(Object.keys(TABLE_LABELS) as TableKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      tab === k
                        ? "bg-amber-400 text-zinc-950"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {TABLE_LABELS[k]}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadCsv(tab)}
                  className="border-amber-400/25 bg-transparent text-zinc-300 hover:bg-amber-400/[0.06] hover:text-white"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void load(token)}
                  disabled={loading}
                  className="border-amber-400/25 bg-transparent text-zinc-300 hover:bg-amber-400/[0.06] hover:text-white"
                >
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="gold-table mt-4 overflow-x-auto rounded-2xl border border-amber-400/[0.14] bg-black/60">
              {rows.length === 0 ? (
                <p className="px-6 py-10 text-center text-sm text-zinc-500">
                  No records yet — this fills up as people use the free world search.
                </p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-amber-400/[0.14] text-[11px] uppercase tracking-wide">
                      {CELL_KEYS[tab].map((k) => (
                        <th key={k} className="px-4 py-3">
                          {HEADER_LABELS[k] ?? k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={String(row.id ?? i)}
                        className="border-b border-amber-400/[0.07] text-zinc-300 last:border-0"
                      >
                        {CELL_KEYS[tab].map((k) => (
                          <td key={k} className="px-4 py-3 align-top">
                            {k === "createdAt"
                              ? new Date(String(row[k])).toISOString().slice(0, 19).replace("T", " ")
                              : k === "countries"
                              ? prettyCountries(String(row[k] ?? ""))
                              : String(row[k] ?? "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <p className="mt-4 text-xs text-zinc-600">
              Exported {payload ? new Date(payload.stats.exportedAt).toISOString().slice(0, 19).replace("T", " ") : ""} ·
              API: <code className="text-zinc-500">/api/admin/export?token=…&amp;format=csv&amp;table=people-scans</code>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function prettyCountries(json: string): string {
  try {
    const codes = JSON.parse(json) as string[];
    return codes.join(", ");
  } catch {
    return json;
  }
}
