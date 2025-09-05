import type { Build, BuildWithLogs } from "./types";

const base = "";

export async function getBuilds(): Promise<{ builds: Build[] }> {
  const r = await fetch(`${base}/api/builds`, { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to fetch builds");
  return r.json();
}

export async function getBuild(id: string): Promise<BuildWithLogs> {
  const r = await fetch(`${base}/api/builds/${id}`, { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to fetch build");
  return r.json();
}

export async function createBuild(input: { package: string; branch?: string }) {
  const r = await fetch(`${base}/api/builds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!r.ok) throw new Error("Failed to create build");
  return r.json();
}
