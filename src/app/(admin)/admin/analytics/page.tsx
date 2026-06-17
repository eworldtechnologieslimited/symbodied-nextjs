import { TrendingUp, Users, ShoppingBag, Wallet } from "lucide-react";
import { StatCard } from "@/components/commerce/stat-card";
import { Card } from "@/components/ui/card";
import { naira } from "@/lib/utils";

const WEEKLY = [
  { day: "Mon", orders: 40 }, { day: "Tue", orders: 65 }, { day: "Wed", orders: 52 },
  { day: "Thu", orders: 80 }, { day: "Fri", orders: 72 }, { day: "Sat", orders: 95 }, { day: "Sun", orders: 88 },
];
const maxOrders = Math.max(...WEEKLY.map((w) => w.orders));

const CATS = [
  { n: "Agriculture", v: 48, color: "#1A6B3C" },
  { n: "Textile", v: 26, color: "#2E9B5A" },
  { n: "Medicine", v: 16, color: "#F5C518" },
  { n: "Technology", v: 10, color: "#9AA3AE" },
];

const TOP_VENDORS = [
  { name: "Ngozi Farms", category: "Agriculture", gmv: 4800000, orders: 312 },
  { name: "Akwete Weavers Guild", category: "Textile", gmv: 2795000, orders: 86 },
  { name: "Herbal Roots Co.", category: "Medicine", gmv: 1319500, orders: 203 },
  { name: "Delta Greens", category: "Agriculture", gmv: 1232000, orders: 44 },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function AdminAnalyticsPage() {
  return (
    <div className="p-7 flex flex-col gap-6">
      <h2 className="font-sans font-bold text-xl text-ink">Platform Analytics</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Users" value="8,412" delta="+124 this week" icon={<Users size={18} />} />
        <StatCard label="Orders (mo)" value="1,204" delta="+9% vs last month" icon={<ShoppingBag size={18} />} />
        <StatCard label="Revenue (mo)" value={naira(23800000)} delta="+11%" icon={<Wallet size={18} />} />
        <StatCard label="GMV (all time)" value={naira(182000000)} icon={<TrendingUp size={18} />} />
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <Card padding="none" className="overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-200 flex items-center justify-between">
            <h3 className="font-sans font-bold text-base text-ink">Orders This Week</h3>
            <span className="text-xs text-ink-500 font-sans">Jun 9 – 15, 2026</span>
          </div>
          <div className="p-6 flex items-end gap-4 h-52">
            {WEEKLY.map((w) => (
              <div key={w.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs text-ink-500 font-sans">{w.orders}</span>
                <div
                  className="w-full max-w-9 rounded-t-md"
                  style={{ height: `${(w.orders / maxOrders) * 100}%`, background: "linear-gradient(180deg, #2E9B5A, #1A6B3C)" }}
                />
                <span className="text-xs text-ink-400 font-sans">{w.day}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="none" className="overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-200">
            <h3 className="font-sans font-bold text-base text-ink">Revenue by Program</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {CATS.map((c) => (
              <div key={c.n}>
                <div className="flex justify-between text-sm mb-1.5 font-sans">
                  <span className="text-ink-600">{c.n}</span>
                  <strong className="text-ink">{c.v}%</strong>
                </div>
                <div className="h-2 bg-ink-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.v}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-200">
          <h3 className="font-sans font-bold text-base text-ink">Top Vendors by GMV</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Vendor</th>
                <th className={th}>Category</th>
                <th className={th}>Total GMV</th>
                <th className={th}>Orders</th>
              </tr>
            </thead>
            <tbody>
              {TOP_VENDORS.map((v) => (
                <tr key={v.name} className="hover:bg-ink-100 transition-colors">
                  <td className={`${td} font-semibold text-ink`}>{v.name}</td>
                  <td className={td}>{v.category}</td>
                  <td className={`${td} font-semibold text-brand`}>{naira(v.gmv)}</td>
                  <td className={td}>{v.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
