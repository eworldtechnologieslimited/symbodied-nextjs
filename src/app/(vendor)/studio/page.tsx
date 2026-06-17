import { Package, Image, Calendar, Wallet, Plus, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/commerce/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

const QUICK_ACTIONS = [
  { label: "New Product", icon: <Package size={20} />, href: "/studio/products/create" },
  { label: "New Blog", icon: <Image size={20} />, href: "/studio/blogs/create" },
  { label: "New Event", icon: <Calendar size={20} />, href: "/studio/events/create" },
  { label: "New Project", icon: <Wallet size={20} />, href: "/studio/projects/create" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default async function VendorStudioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const service = createServiceClient();

  const [
    { count: productCount },
    { count: blogCount },
    { count: eventCount },
    { data: earningsRows },
    { data: products },
  ] = await Promise.all([
    service.from("products").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    service.from("blogs").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "approved"),
    service.from("events").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "active"),
    service.from("orders").select("total").eq("vendor_id", user.id),
    service.from("products")
      .select("id, name, price, stock, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalEarnings = (earningsRows ?? []).reduce((s, o) => s + ((o.total as number) ?? 0), 0);

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Products" value={productCount != null ? String(productCount) : "—"} icon={<Package size={18} />} />
        <StatCard label="Published Blogs" value={blogCount != null ? String(blogCount) : "—"} icon={<Image size={18} />} />
        <StatCard label="Active Events" value={eventCount != null ? String(eventCount) : "—"} icon={<Calendar size={18} />} />
        <StatCard label="Total Earnings" value={totalEarnings > 0 ? naira(totalEarnings) : "—"} icon={<Wallet size={18} />} />
      </div>

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

      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200">
          <h3 className="font-sans font-bold text-base text-ink">My Products</h3>
          <Button variant="primary" size="sm" leadingIcon={<Plus size={15} />}>Add Product</Button>
        </div>
        <div className="overflow-x-auto">
          {!products || products.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No products yet. Add your first product to get started.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Product</th>
                  <th className={th}>Price</th>
                  <th className={th}>Stock</th>
                  <th className={th}>Status</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id as string} className="hover:bg-ink-100 transition-colors">
                    <td className={`${td} font-semibold text-ink`}>{p.name as string}</td>
                    <td className={td}>{naira(p.price as number)}</td>
                    <td className={td}>
                      {(p.stock as number) === 0
                        ? <span className="text-error font-semibold">Out of stock</span>
                        : p.stock as number}
                    </td>
                    <td className={td}><StatusBadge status={p.status as string} /></td>
                    <td className={`${td} text-right`}>
                      <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={14} />}>Edit</Button>
                    </td>
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
