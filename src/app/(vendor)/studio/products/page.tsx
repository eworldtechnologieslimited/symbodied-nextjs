"use client";

import { useState } from "react";
import { Plus, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";

const PRODUCTS = [
  { id: "p1", name: "Premium Abakaliki Rice — 50kg", category: "Agriculture", price: 48000, stock: 120, sold: 312, status: "active" },
  { id: "p2", name: "Handwoven Akwete Cloth — Royal Indigo", category: "Textile", price: 32500, stock: 18, sold: 86, status: "active" },
  { id: "p3", name: "Organic Palm Oil — 25L keg", category: "Agriculture", price: 28000, stock: 0, sold: 44, status: "draft" },
  { id: "p4", name: "Dried Utazi & Bitterleaf Bundle", category: "Medicine", price: 6500, stock: 55, sold: 203, status: "active" },
  { id: "p5", name: "Yellow Garri — Premium Sieve, 10kg", category: "Agriculture", price: 12000, stock: 80, sold: 120, status: "active" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function StudioProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">My Products</h2>
        <Button variant="primary" size="sm" leadingIcon={<Plus size={15} />}>Add Product</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: PRODUCTS.length },
          { label: "Active", value: PRODUCTS.filter((p) => p.status === "active").length },
          { label: "Draft", value: PRODUCTS.filter((p) => p.status === "draft").length },
          { label: "Out of Stock", value: PRODUCTS.filter((p) => p.stock === 0).length },
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-ink leading-none">{s.value}</div>
            <div className="mt-1 text-xs text-ink-500 font-sans">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-200 max-w-xs">
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} leadingIcon={<Search size={15} />} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Product</th>
                <th className={th}>Category</th>
                <th className={th}>Price</th>
                <th className={th}>Stock</th>
                <th className={th}>Sold</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-ink-100 transition-colors">
                  <td className={`${td} font-semibold text-ink max-w-[240px]`}><span className="line-clamp-2">{p.name}</span></td>
                  <td className={td}><Badge tone="brand" size="sm">{p.category}</Badge></td>
                  <td className={td}>{naira(p.price)}</td>
                  <td className={td}>
                    {p.stock === 0 ? <span className="text-error font-semibold text-xs">Out of stock</span> : p.stock}
                  </td>
                  <td className={td}>{p.sold}</td>
                  <td className={td}><StatusBadge status={p.status} /></td>
                  <td className={`${td} text-right`}>
                    <div className="inline-flex gap-1">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={13} />}>View</Button>
                    </div>
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
