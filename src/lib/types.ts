export type BuildStatus = "queued" | "building" | "failed" | "succeeded";

export type Build = {
  id: string;
  package: string;
  status: BuildStatus;
  startedAt: string;        // ISO string
  durationSec?: number;
  branch?: string;
};

export type BuildWithLogs = Build & {
  logs: string[];
};
