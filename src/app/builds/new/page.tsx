"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBuild } from "@/lib/api";

export default function NewBuildPage() {
  const r = useRouter();
  const [pkg, setPkg] = useState("");
  const [branch, setBranch] = useState("main");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      const b = await createBuild({ package: pkg, branch });
      r.push(`/builds/${b.id}`);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to queue build");
      setBusy(false);
    }
  }

  return (
    <section className="max-w-lg space-y-4">
      <h1 className="text-xl font-semibold">Start a new build</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm">
          <span className="mb-1 block opacity-80">Package</span>
          <input className="w-full rounded border border-white/10 bg-surface/60 px-3 py-2"
                 required value={pkg} onChange={e => setPkg(e.target.value)} placeholder="e.g. glibc" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block opacity-80">Branch</span>
          <input className="w-full rounded border border-white/10 bg-surface/60 px-3 py-2"
                 value={branch} onChange={e => setBranch(e.target.value)} />
        </label>
        {err && <div className="text-red-400 text-sm">{err}</div>}
        <div className="flex gap-2">
          <button disabled={busy} className="rounded border border-white/10 bg-white/10 px-4 py-2">
            {busy ? "Queuing..." : "Queue build"}
          </button>
          <a href="/" className="rounded border border-white/10 px-4 py-2">Cancel</a>
        </div>
      </form>
    </section>
  );
}
