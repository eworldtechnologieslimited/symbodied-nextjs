import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";

const ORDERS = [
  { id: "SYM-024891", customer: "Ada Obi", product: "Premium Abakaliki Rice — 50kg", qty: 1, total: 48000, date: "Jun 14, 2026", status: "shipped" },
  { id: "SYM-024750", customer: "Chidi Nwosu", product: "Organic Palm Oil — 25L keg", qty: 2, total: 56000, date: "Jun 12, 2026", status: "processing" },
  { id: "SYM-024680", customer: "Ngozi Eze", product: "Premium Abakaliki Rice — 50kg", qty: 1, total: 48000, date: "Jun 10, 2026", status: "delivered" },
  { id: "SYM-024512", customer: "Emeka Obi", product: "Yellow Garri — 10kg", qty: 3, total: 36000, date: "Jun 5, 2026", status: "delivered" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function StudioOrdersPage() {
  return (
    <div className="p-7 flex flex-col gap-6">
      <h2 className="font-sans font-bold text-xl text-ink">Incoming Orders</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: "Total", value: "4" }, { label: "Processing", value: "1" }, { label: "Shipped", value: "1" }, { label: "Delivered", value: "2" }].map((s) => (
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
              {ORDERS.map((o) => (
                <tr key={o.id} className="hover:bg-ink-100 transition-colors">
                  <td className={td}><span className="font-mono font-semibold text-ink text-xs">{o.id}</span></td>
                  <td className={`${td} font-semibold text-ink`}>{o.customer}</td>
                  <td className={td}><span className="line-clamp-1">{o.product}</span></td>
                  <td className={td}>{o.qty}</td>
                  <td className={`${td} font-semibold text-ink`}>{naira(o.total)}</td>
                  <td className={td}>{o.date}</td>
                  <td className={td}><StatusBadge status={o.status} /></td>
                  <td className={`${td} text-right`}>
                    <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={13} />}>Details</Button>
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
