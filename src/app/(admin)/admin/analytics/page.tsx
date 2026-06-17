import { TrendingUp, Users, ShoppingBag, Wallet } from "lucide-react";
import { StatCard } from "@/components/commerce/stat-card";
import { Card } from "@/components/ui/card";
import { naira } from "@/lib/utils";
import { createServiceClient } from "@/lib/supabase/service";

const PROGRAM_COLORS: Record<string, string> = {
  Agriculture: "#1A6B3C",
  Textile: "#2E9B5A",
  Medicine: "#F5C518",
  Technology: "#9AA3AE",
};

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default async function AdminAnalyticsPage() {
  const supabase = createServiceClient();

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 6);
  weekAgo.setHours(0, 0, 0, 0);

  const [
    { count: userCount },
    { data: allOrders },
    { data: weekOrders },
    { data: productRows },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).neq("role", "admin"),
    supabase.from("orders").select("total, vendor, status, created_at"),
    supabase.from("orders").select("created_at").gte("created_at", weekAgo.toISOString()),
    supabase.from("products").select("category"),
  ]);

  const monthOrders = (allOrders ?? []).filter(
    (o) => o.created_at && o.created_at >= monthStart
  );
  const monthRevenue = monthOrders.reduce((s, o) => s + ((o.total as number) ?? 0), 0);
  const allTimeGMV = (allOrders ?? []).reduce((s, o) => s + ((o.total as number) ?? 0), 0);

  // Weekly bar chart — last 7 days
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekAgo);
    d.setDate(d.getDate() + i);
    return d;
  });
  const weeklyData = last7.map((d) => {
    const dayStr = d.toISOString().slice(0, 10);
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      count: (weekOrders ?? []).filter((o) => (o.created_at as string)?.slice(0, 10) === dayStr).length,
    };
  });
  const maxCount = Math.max(...weeklyData.map((w) => w.count), 1);

  // Products by program
  const catMap: Record<string, number> = {};
  (productRows ?? []).forEach((p) => {
    const c = (p.category as string) ?? "Other";
    catMap[c] = (catMap[c] ?? 0) + 1;
  });
  const total = Object.values(catMap).reduce((a, b) => a + b, 0) || 1;
  const cats = Object.entries(catMap)
    .map(([n, v]) => ({ n, v: Math.round((v / total) * 100), color: PROGRAM_COLORS[n] ?? "#9AA3AE" }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 4);

  // Top vendors by GMV
  const vendorMap: Record<string, { gmv: number; orders: number }> = {};
  (allOrders ?? []).forEach((o) => {
    const name = (o.vendor as string) ?? "Unknown";
    if (!vendorMap[name]) vendorMap[name] = { gmv: 0, orders: 0 };
    vendorMap[name].gmv += (o.total as number) ?? 0;
    vendorMap[name].orders += 1;
  });
  const topVendors = Object.entries(vendorMap)
    .map(([name, d]) => ({ name, ...d }))
    .sort((a, b) => b.gmv - a.gmv)
    .slice(0, 5);

  const dateLabel = `${last7[0].toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${last7[6].toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;

  return (
    <div className="p-7 flex flex-col gap-6">
      <h2 className="font-sans font-bold text-xl text-ink">Platform Analytics</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Users"
          value={userCount != null ? userCount.toLocaleString() : "—"}
          icon={<Users size={18} />}
        />
        <StatCard
          label="Orders (mo)"
          value={monthOrders.length.toLocaleString()}
          icon={<ShoppingBag size={18} />}
        />
        <StatCard
          label="Revenue (mo)"
          value={monthRevenue > 0 ? naira(monthRevenue) : "—"}
          icon={<Wallet size={18} />}
        />
        <StatCard
          label="GMV (all time)"
          value={allTimeGMV > 0 ? naira(allTimeGMV) : "—"}
          icon={<TrendingUp size={18} />}
        />
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <Card padding="none" className="overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
            <h3 className="font-sans font-bold text-base text-ink">Orders This Week</h3>
            <span className="text-xs text-ink-500 font-sans">{dateLabel}</span>
          </div>
          <div className="p-6 flex items-end gap-4 h-52">
            {weeklyData.map((w) => (
              <div key={w.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                {w.count > 0 && (
                  <span className="text-xs text-ink-500 font-sans">{w.count}</span>
                )}
                <div
                  className="w-full max-w-9 rounded-t-md"
                  style={{
                    height: `${(w.count / maxCount) * 100}%`,
                    minHeight: w.count > 0 ? "4px" : "2px",
                    background: w.count > 0
                      ? "linear-gradient(180deg, #2E9B5A, #1A6B3C)"
                      : "#E5E7EB",
                  }}
                />
                <span className="text-xs text-ink-400 font-sans">{w.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="none" className="overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-200">
            <h3 className="font-sans font-bold text-base text-ink">Products by Program</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {cats.length > 0 ? cats.map((c) => (
              <div key={c.n}>
                <div className="flex justify-between text-sm mb-1.5 font-sans">
                  <span className="text-ink-600">{c.n}</span>
                  <strong className="text-ink">{c.v}%</strong>
                </div>
                <div className="h-2 bg-ink-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.v}%`, background: c.color }} />
                </div>
              </div>
            )) : (
              <p className="text-sm text-ink-400 font-sans">No product data yet.</p>
            )}
          </div>
        </Card>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-200">
          <h3 className="font-sans font-bold text-base text-ink">Top Vendors by GMV</h3>
        </div>
        <div className="overflow-x-auto">
          {topVendors.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Vendor</th>
                  <th className={th}>Orders</th>
                  <th className={th}>Total GMV</th>
                </tr>
              </thead>
              <tbody>
                {topVendors.map((v) => (
                  <tr key={v.name} className="hover:bg-ink-100 transition-colors">
                    <td className={`${td} font-semibold text-ink`}>{v.name}</td>
                    <td className={td}>{v.orders}</td>
                    <td className={`${td} font-semibold text-brand`}>{naira(v.gmv)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No order data yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
