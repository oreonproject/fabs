"use client";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { Build } from "../lib/types";
import { useMemo, useState } from "react";

export default function DataTable({ data }: { data: Build[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter(
      (b) => b.package.toLowerCase().includes(s) || b.id.toLowerCase().includes(s)
    );
  }, [q, data]);

  return (
    <div>
      <input
        className="mb-3 w-full max-w-sm rounded border border-gray-700 bg-surface/60 px-3 py-2 text-sm"
        placeholder="Search by package or ID…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="overflow-x-auto rounded border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-surface/60">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Package</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Started</th>
              <th className="p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-t border-gray-800 hover:bg-white/5">
                <td className="p-2">
                  <Link href={`/builds/${b.id}`} className="underline">
                    {b.id}
                  </Link>
                </td>
                <td className="p-2">{b.package}</td>
                <td className="p-2"><StatusBadge status={b.status} /></td>
                <td className="p-2">{new Date(b.startedAt).toLocaleString()}</td>
                <td className="p-2">{b.durationSec ? `${Math.round(b.durationSec / 60)}m` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
