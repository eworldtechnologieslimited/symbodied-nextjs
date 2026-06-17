import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";

const ORDERS = [
  { id: "SYM-024891", date: "Jun 14, 2026", items: [{ name: "Premium Abakaliki Rice — 50kg", qty: 1 }, { name: "Organic Palm Oil — 25L keg", qty: 2 }], total: 104000, status: "shipped" },
  { id: "SYM-024702", date: "Jun 09, 2026", items: [{ name: "Handwoven Akwete Cloth — Royal Indigo", qty: 1 }], total: 32500, status: "delivered" },
  { id: "SYM-024533", date: "Jun 02, 2026", items: [{ name: "Dried Utazi & Bitterleaf Bundle", qty: 2 }, { name: "Yellow Garri — 10kg", qty: 1 }], total: 25000, status: "delivered" },
  { id: "SYM-024201", date: "May 28, 2026", items: [{ name: "Cold-Pressed Black Seed Oil — 500ml", qty: 1 }], total: 9800, status: "cancelled" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function OrdersPage() {
  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">My Orders</h2>
        <div className="flex items-center gap-2 text-sm font-sans text-ink-600">
          Filter: <button className="font-semibold text-ink flex items-center gap-1">All <ChevronDown size={14} /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: "Total Orders", value: "12" }, { label: "Delivered", value: "9" }, { label: "In Transit", value: "2" }, { label: "Cancelled", value: "1" }].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-ink leading-none">{s.value}</div>
            <div className="mt-1 text-xs text-ink-500 font-sans">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Order ID</th>
                <th className={th}>Date</th>
                <th className={th}>Items</th>
                <th className={th}>Total</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id} className="hover:bg-ink-100 transition-colors">
                  <td className={td}><span className="font-mono font-semibold text-ink text-xs">{o.id}</span></td>
                  <td className={td}>{o.date}</td>
                  <td className={td}>
                    <div className="flex flex-col gap-0.5">
                      {o.items.map((item) => <span key={item.name} className="text-xs">• {item.name} ×{item.qty}</span>)}
                    </div>
                  </td>
                  <td className={`${td} font-semibold text-ink`}>{naira(o.total)}</td>
                  <td className={td}><StatusBadge status={o.status} /></td>
                  <td className={`${td} text-right`}>
                    <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={14} />}>Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
