import type { Build, BuildWithLogs, BuildStatus } from "../lib/types";

const now = Date.now();

export const builds: Build[] = [
  { id: '1', package: 'kernel',   status: 'building',  startedAt: new Date(now - 60_000).toISOString(),  branch: 'main' },
  { id: '2', package: 'glibc',    status: 'failed',    startedAt: new Date(now - 3_600_000).toISOString(), durationSec: 3540, branch: 'r9' },
  { id: '3', package: 'openssl',  status: 'succeeded', startedAt: new Date(now - 7_200_000).toISOString(), durationSec: 900,  branch: 'stable' },
  { id: '4', package: 'python',   status: 'queued',    startedAt: new Date(now).toISOString(), branch: 'main' },
];

// in-memory logs by id
const logs = new Map<string, string[]>();

function pushLog(id: string, line: string) {
  const arr = logs.get(id) ?? [];
  arr.push(line);
  // cap to last ~1000 lines to avoid runaway
  if (arr.length > 1000) arr.splice(0, arr.length - 1000);
  logs.set(id, arr);
}

export function withLogs(id: string): BuildWithLogs {
  const b = builds.find(x => x.id === id) ?? builds[0];
  const arr = logs.get(b.id) ?? [];
  return { ...b, logs: arr.length ? arr : ['[boot] no logs yet'] };
}

// simple helpers for the simulator
export function setStatus(id: string, status: BuildStatus) {
  const b = builds.find(x => x.id === id);
  if (!b) return;
  b.status = status;
  if (status === 'building' && !b.startedAt) b.startedAt = new Date().toISOString();
  if (status === 'succeeded' || status === 'failed') {
    const dur = Math.max(30, Math.floor((Date.now() - new Date(b.startedAt).getTime()) / 1000));
    b.durationSec = dur;
  }
}

export function appendLog(id: string, text: string) {
  pushLog(id, text);
}

export function createBuild(pkg: string, branch?: string) {
  const id = (Math.random().toString(36).slice(2, 10));
  const build: Build = {
    id,
    package: pkg,
    status: 'queued',
    startedAt: new Date().toISOString(),
    branch: branch ?? 'main',
  };
  builds.unshift(build);
  pushLog(id, `[queue] queued build for ${pkg} (${branch ?? 'main'})`);
  return build;
}
