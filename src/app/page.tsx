import { getBuilds } from "@/lib/api";
import DataTable from "@/components/DataTable";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { builds } = await getBuilds();
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Recent builds</h1>
        <a href="/builds/new" className="rounded border border-white/10 bg-white/10 px-3 py-1.5 text-sm">New build</a>
      </div>
      <DataTable data={builds} />
    </section>
  );
}
