import { ShoppingBag, Heart, Package, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/commerce/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar } from "@/components/ui/avatar";
import { naira } from "@/lib/utils";

const RECENT_ORDERS = [
  { id: "SYM-024891", date: "Jun 14", items: 3, total: 94500, status: "shipped" },
  { id: "SYM-024702", date: "Jun 09", items: 1, total: 48000, status: "delivered" },
  { id: "SYM-024533", date: "Jun 02", items: 2, total: 24500, status: "delivered" },
  { id: "SYM-024201", date: "May 28", items: 1, total: 9800, status: "cancelled" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function UserDashboardPage() {
  return (
    <div className="p-7 flex flex-col gap-6">
      {/* Welcome */}
      <div className="flex items-center gap-4">
        <Avatar name="Ada Obi" size="xl" ring />
        <div>
          <h2 className="font-display font-bold text-2xl text-ink">Welcome back, Ada</h2>
          <p className="text-sm text-ink-500 font-sans mt-0.5">Here's what's happening across your account.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard label="Orders" value="12" delta="+2 this month" icon={<ShoppingBag size={18} />} />
        <StatCard label="Donations" value={naira(85000)} delta="3 projects backed" icon={<Heart size={18} />} />
        <StatCard label="Saved Items" value="8" icon={<Package size={18} />} />
      </div>

      {/* Recent orders table */}
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200">
          <h3 className="font-sans font-bold text-base text-ink">Recent Orders</h3>
          <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={15} />}>View all</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Order</th>
                <th className={th}>Date</th>
                <th className={th}>Items</th>
                <th className={th}>Total</th>
                <th className={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o) => (
                <tr key={o.id} className="hover:bg-ink-100 transition-colors">
                  <td className={td}>
                    <span className="font-mono text-ink font-semibold">{o.id}</span>
                  </td>
                  <td className={td}>{o.date}</td>
                  <td className={td}>{o.items}</td>
                  <td className={`${td} font-semibold text-ink`}>{naira(o.total)}</td>
                  <td className={td}><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
