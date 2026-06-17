import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function StudioOrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const service = createServiceClient();
  const { data: orders } = await service
    .from("orders")
    .select("id, customer, product, qty, total, created_at, status")
    .eq("vendor_id", user.id)
    .order("created_at", { ascending: false });

  const rows = orders ?? [];
  const statuses = ["processing", "shipped", "delivered"] as const;

  return (
    <div className="p-7 flex flex-col gap-6">
      <h2 className="font-sans font-bold text-xl text-ink">Incoming Orders</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: rows.length },
          ...statuses.map((s) => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: rows.filter((o) => (o.status as string) === s).length })),
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-ink leading-none">{s.value}</div>
            <div className="mt-1 text-xs text-ink-500 font-sans">{s.label}</div>
          </Card>
        ))}
      </div>
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          {rows.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No orders yet.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Order ID</th>
                  <th className={th}>Customer</th>
                  <th className={th}>Product</th>
                  <th className={th}>Qty</th>
                  <th className={th}>Total</th>
                  <th className={th}>Date</th>
                  <th className={th}>Status</th>
                  <th className={`${th} text-right`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((o) => (
                  <tr key={o.id as string} className="hover:bg-ink-100 transition-colors">
                    <td className={td}><span className="font-mono font-semibold text-ink text-xs">{o.id as string}</span></td>
                    <td className={`${td} font-semibold text-ink`}>{(o.customer as string) ?? "—"}</td>
                    <td className={td}><span className="line-clamp-1">{(o.product as string) ?? "—"}</span></td>
                    <td className={td}>{(o.qty as number) ?? "—"}</td>
                    <td className={`${td} font-semibold text-ink`}>{o.total != null ? naira(o.total as number) : "—"}</td>
                    <td className={td}>{formatDate(o.created_at as string | null)}</td>
                    <td className={td}><StatusBadge status={o.status as string} /></td>
                    <td className={`${td} text-right`}>
                      <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={13} />}>Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
