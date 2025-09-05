import { getBuild } from "@/lib/api";
import LogViewer from "@/components/LogViewer";
import StatusBadge from "@/components/StatusBadge";

type Params = { params: { id: string } };
export const dynamic = "force-dynamic";

export default async function BuildPage({ params }: Params) {
  const b = await getBuild(params.id);
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
