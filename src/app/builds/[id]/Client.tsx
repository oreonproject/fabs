"use client";
import { useState, useEffect } from "react";
import { getBuild } from "@/lib/api";
import LogViewer from "@/components/LogViewer";
import StatusBadge from "@/components/StatusBadge";
import type { BuildWithLogs } from "@/lib/types";

type Props = { id: string };

export default function BuildClient({ id }: Props) {
  const [b, setB] = useState<BuildWithLogs | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const poll = async () => {
      try {
        const data = await getBuild(id);
        setB(data);
        setErr(null);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load build");
      }
    };
    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, [id]);

  if (err) return <div className="text-red-400">{err}</div>;
  if (!b) return <div>Loading...</div>;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">{b.package}</h1>
        <span className="text-xs opacity-60">({b.id})</span>
        <StatusBadge status={b.status} />
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-sm opacity-90">
        <div>Started: {new Date(b.startedAt).toLocaleString()}</div>
        <div>Branch: {b.branch ?? "main"}</div>
      </div>
      <LogViewer lines={b.logs} />
    </section>
  );
}
