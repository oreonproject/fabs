import type { Build, BuildWithLogs } from "../lib/types";

const now = Date.now();

export const builds: Build[] = [
  { id: "1", package: "kernel",   status: "building",  startedAt: new Date(now - 60_000).toISOString(), branch: "main" },
  { id: "2", package: "glibc",    status: "failed",    startedAt: new Date(now - 3_600_000).toISOString(), durationSec: 3540, branch: "r9" },
  { id: "3", package: "openssl",  status: "succeeded", startedAt: new Date(now - 7_200_000).toISOString(), durationSec: 900,   branch: "stable" },
  { id: "4", package: "python",   status: "queued",    startedAt: new Date(now).toISOString(), branch: "main" },
];

export function withLogs(id: string): BuildWithLogs {
  const b = builds.find(x => x.id === id) ?? builds[0];
  const logs = Array.from({ length: 60 }, (_, i) => `[${new Date().toISOString()}] step ${i + 1}: doing something...`);
  return { ...b, logs };
}
