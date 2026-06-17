import { ShoppingBag, Heart, Package, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/commerce/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar } from "@/components/ui/avatar";
import { naira } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default async function UserDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const service = createServiceClient();

  const [
    { data: profile },
    { data: recentOrders },
    { count: orderCount },
    { count: savedCount },
    { data: donations },
  ] = await Promise.all([
    service.from("profiles").select("first_name, last_name").eq("id", user.id).single(),
    service.from("orders").select("id, total, created_at, status").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
    service.from("orders").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    service.from("saved_items").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    service.from("donations").select("amount").eq("user_id", user.id),
  ]);

  const firstName = (profile?.first_name as string) ?? (user.user_metadata?.first_name as string) ?? "";
  const lastName = (profile?.last_name as string) ?? (user.user_metadata?.last_name as string) ?? "";
  const displayName = `${firstName} ${lastName}`.trim() || (user.email?.split("@")[0] ?? "there");
  const firstNameOnly = firstName ? firstName : displayName;

  const totalDonated = (donations ?? []).reduce((s, d) => s + ((d.amount as number) ?? 0), 0);
  const donationCount = donations?.length ?? 0;

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar name={displayName} size="xl" ring />
        <div>
          <h2 className="font-display font-bold text-2xl text-ink">Welcome back, {firstNameOnly}</h2>
          <p className="text-sm text-ink-500 font-sans mt-0.5">Here's what's happening across your account.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard
          label="Orders"
          value={orderCount != null ? String(orderCount) : "—"}
          icon={<ShoppingBag size={18} />}
        />
        <StatCard
          label="Donations"
          value={totalDonated > 0 ? naira(totalDonated) : "—"}
          delta={donationCount > 0 ? `${donationCount} project${donationCount !== 1 ? "s" : ""} backed` : undefined}
          icon={<Heart size={18} />}
        />
        <StatCard
          label="Saved Items"
          value={savedCount != null ? String(savedCount) : "—"}
          icon={<Package size={18} />}
        />
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200">
          <h3 className="font-sans font-bold text-base text-ink">Recent Orders</h3>
          <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={15} />}>View all</Button>
        </div>
        <div className="overflow-x-auto">
          {!recentOrders || recentOrders.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No orders yet.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Order</th>
                  <th className={th}>Date</th>
                  <th className={th}>Total</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id as string} className="hover:bg-ink-100 transition-colors">
                    <td className={td}>
                      <span className="font-mono text-ink font-semibold">{o.id as string}</span>
                    </td>
                    <td className={td}>{formatDate(o.created_at as string | null)}</td>
                    <td className={`${td} font-semibold text-ink`}>
                      {o.total != null ? naira(o.total as number) : "—"}
                    </td>
                    <td className={td}><StatusBadge status={o.status as string} /></td>
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
