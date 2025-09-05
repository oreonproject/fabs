import { BuildStatus } from "../lib/types";

const map: Record<BuildStatus, string> = {
  queued: "bg-gray-700 text-gray-200",
  building: "bg-amber-500 text-black",
  failed: "bg-red-600 text-white",
  succeeded: "bg-green-500 text-black",
};

export default function StatusBadge({ status }: { status: BuildStatus }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  );
}
