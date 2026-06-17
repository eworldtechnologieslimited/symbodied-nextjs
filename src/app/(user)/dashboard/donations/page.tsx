import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { naira, pct } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function DonationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const service = createServiceClient();
  const { data: donations } = await service
    .from("donations")
    .select("id, project, category, amount, created_at, status, projects(name, target, raised)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const rows = donations ?? [];
  const total = rows.reduce((s, d) => s + ((d.amount as number) ?? 0), 0);
  const active = rows.filter((d) => (d.status as string) === "active").length;

  return (
    <div className="p-7 flex flex-col gap-6">
      <h2 className="font-sans font-bold text-xl text-ink">My Donations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total donated", value: total > 0 ? naira(total) : "—" },
          { label: "Projects backed", value: String(rows.length) },
          { label: "Active projects", value: String(active) },
        ].map((s) => (
          <Card key={s.label} padding="md">
            <div className="font-display font-bold text-2xl text-ink leading-none">{s.value}</div>
            <div className="mt-1 text-xs text-ink-500 font-sans">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          {rows.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No donations yet.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Project</th>
                  <th className={th}>Category</th>
                  <th className={th}>My Donation</th>
                  <th className={th}>Progress</th>
                  <th className={th}>Date</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => {
                  const proj = (d as { projects?: { name?: string; target?: number; raised?: number } | null }).projects;
                  const projectName = proj?.name ?? (d.project as string) ?? "—";
                  const target = proj?.target ?? 0;
                  const raised = proj?.raised ?? 0;
                  return (
                    <tr key={d.id as string} className="hover:bg-ink-100 transition-colors">
                      <td className={`${td} font-semibold text-ink max-w-52`}>
                        <span className="line-clamp-2">{projectName}</span>
                      </td>
                      <td className={td}>{(d.category as string) ?? "—"}</td>
                      <td className={`${td} font-semibold text-brand`}>{naira(d.amount as number)}</td>
                      <td className={td}>
                        {target > 0 ? (
                          <div className="w-28">
                            <div className="text-xs font-sans mb-1">{pct(raised, target)}%</div>
                            <ProgressBar value={pct(raised, target)} color="gold" size="sm" />
                          </div>
                        ) : (
                          <span className="text-ink-400">—</span>
                        )}
                      </td>
                      <td className={td}>{formatDate(d.created_at as string | null)}</td>
                      <td className={td}><StatusBadge status={d.status as string} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
