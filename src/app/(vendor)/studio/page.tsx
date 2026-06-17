import { Package, Image, Calendar, Wallet, Plus, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/commerce/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";

const PRODUCTS = [
  { name: "Premium Abakaliki Rice — 50kg", price: 48000, stock: 120, status: "active", sold: 312 },
  { name: "Handwoven Akwete Cloth — Royal Indigo", price: 32500, stock: 18, status: "active", sold: 86 },
  { name: "Organic Palm Oil — 25L keg", price: 28000, stock: 0, status: "draft", sold: 0 },
];

const QUICK_ACTIONS = [
  { label: "New Product", icon: <Package size={20} />, href: "/studio/products/create" },
  { label: "New Blog", icon: <Image size={20} />, href: "/studio/blogs/create" },
  { label: "New Event", icon: <Calendar size={20} />, href: "/studio/events/create" },
  { label: "New Project", icon: <Wallet size={20} />, href: "/studio/projects/create" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function VendorStudioPage() {
  return (
    <div className="p-7 flex flex-col gap-6">
      {/* KPI cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Products" value="24" icon={<Package size={18} />} />
        <StatCard label="Published Blogs" value="9" icon={<Image size={18} />} />
        <StatCard label="Active Events" value="3" icon={<Calendar size={18} />} />
        <StatCard label="Total Earnings" value={naira(4200000)} delta="+12% this month" icon={<Wallet size={18} />} />
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {QUICK_ACTIONS.map((a) => (
          <Card key={a.label} hoverable padding="lg" className="flex flex-col gap-3 cursor-pointer">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-light text-brand">
              {a.icon}
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink font-sans text-sm">
              <Plus size={15} />{a.label}
            </span>
          </Card>
        ))}
      </div>

      {/* Products table */}
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200">
          <h3 className="font-sans font-bold text-base text-ink">My Products</h3>
          <Button variant="primary" size="sm" leadingIcon={<Plus size={15} />}>Add Product</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Product</th>
                <th className={th}>Price</th>
                <th className={th}>Stock</th>
                <th className={th}>Sold</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.name} className="hover:bg-ink-100 transition-colors">
                  <td className={`${td} font-semibold text-ink`}>{p.name}</td>
                  <td className={td}>{naira(p.price)}</td>
                  <td className={td}>
                    {p.stock === 0 ? <span className="text-error font-semibold">Out of stock</span> : p.stock}
                  </td>
                  <td className={td}>{p.sold}</td>
                  <td className={td}><StatusBadge status={p.status} /></td>
                  <td className={`${td} text-right`}>
                    <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={14} />}>Edit</Button>
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
