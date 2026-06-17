"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";

const ORDERS = [
  { id: "SYM-024891", customer: "Ada Obi", vendor: "Ngozi Farms", product: "Premium Abakaliki Rice", total: 48000, date: "Jun 14, 2026", status: "shipped" },
  { id: "SYM-024880", customer: "Emeka Obi", vendor: "Akwete Weavers Guild", product: "Handwoven Akwete Cloth", total: 32500, date: "Jun 13, 2026", status: "processing" },
  { id: "SYM-024750", customer: "Ngozi Eze", vendor: "Delta Greens", product: "Organic Palm Oil — 25L", total: 56000, date: "Jun 12, 2026", status: "delivered" },
  { id: "SYM-024702", customer: "Chidi Nwosu", vendor: "Herbal Roots Co.", product: "Dried Utazi Bundle", total: 6500, date: "Jun 9, 2026", status: "delivered" },
  { id: "SYM-024680", customer: "Kemi Lawal", vendor: "Sahel Naturals", product: "Black Seed Oil — 500ml", total: 9800, date: "Jun 8, 2026", status: "cancelled" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const filtered = ORDERS.filter((o) => !search || o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">All Orders</h2>
        <div className="flex items-center gap-2 text-sm font-sans text-ink-600">
          Filter: <button className="font-semibold text-ink flex items-center gap-1">All statuses <ChevronDown size={14} /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: ORDERS.length },
          { label: "Processing", value: ORDERS.filter((o) => o.status === "processing").length },
          { label: "Shipped", value: ORDERS.filter((o) => o.status === "shipped").length },
          { label: "Delivered", value: ORDERS.filter((o) => o.status === "delivered").length },
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-ink leading-none">{s.value}</div>
            <div className="mt-1 text-xs text-ink-500 font-sans">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-200 max-w-sm">
          <Input placeholder="Search by order ID or customer..." value={search} onChange={(e) => setSearch(e.target.value)} leadingIcon={<Search size={15} />} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Order ID</th>
                <th className={th}>Customer</th>
                <th className={th}>Vendor</th>
                <th className={th}>Product</th>
                <th className={th}>Total</th>
                <th className={th}>Date</th>
                <th className={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-ink-100 transition-colors">
                  <td className={td}><span className="font-mono font-semibold text-ink text-xs">{o.id}</span></td>
                  <td className={`${td} font-semibold text-ink`}>{o.customer}</td>
                  <td className={td}>{o.vendor}</td>
                  <td className={td}>{o.product}</td>
                  <td className={`${td} font-semibold text-ink`}>{naira(o.total)}</td>
                  <td className={td}>{o.date}</td>
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
