"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type OrderRow = {
  id: string;
  customer: string | null;
  vendor: string | null;
  product: string | null;
  total: number | null;
  created_at: string | null;
  status: string;
};

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("orders")
      .select("id, customer, vendor, product, total, created_at, status")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data as OrderRow[]) ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (o.id ?? "").toLowerCase().includes(q) ||
      (o.customer ?? "").toLowerCase().includes(q)
    );
  });

  const statuses = ["processing", "shipped", "delivered"] as const;

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
          { label: "Total", value: orders.length },
          ...statuses.map((s) => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: orders.filter((o) => o.status === s).length })),
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-ink leading-none">
              {loading ? "—" : s.value}
            </div>
            <div className="mt-1 text-xs text-ink-500 font-sans">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-200 max-w-sm">
          <Input
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leadingIcon={<Search size={15} />}
          />
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">Loading orders…</p>
          ) : filtered.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No orders found.</p>
          ) : (
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
                    <td className={`${td} font-semibold text-ink`}>{o.customer ?? "—"}</td>
                    <td className={td}>{o.vendor ?? "—"}</td>
                    <td className={td}>{o.product ?? "—"}</td>
                    <td className={`${td} font-semibold text-ink`}>{o.total != null ? naira(o.total) : "—"}</td>
                    <td className={td}>{formatDate(o.created_at)}</td>
                    <td className={td}><StatusBadge status={o.status} /></td>
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
