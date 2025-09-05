import type { Build, BuildWithLogs } from "@/lib/types";
import { headers } from "next/headers";

async function serverBase() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) throw new Error("Missing Host header");
  return `${proto}://${host}`;
}

async function makeUrl(path: string) {
  if (typeof window !== "undefined") return path; // browser: relative ok (MSW can intercept)
  return `${await serverBase()}${path}`;           // server: need absolute
}

export async function getBuilds(): Promise<{ builds: Build[] }> {
  const url = await makeUrl("/api/builds");
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to fetch builds");
  return r.json();
}

export async function getBuild(id: string): Promise<BuildWithLogs> {
  const url = await makeUrl(`/api/builds/${id}`);
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to fetch build");
  return r.json();
}

export async function createBuild(input: { package: string; branch?: string }) {
  const url = await makeUrl("/api/builds");
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!r.ok) throw new Error("Failed to create build");
  return r.json();
}
