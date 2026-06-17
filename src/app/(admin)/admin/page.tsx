import { Users, Package, Wallet, Bell } from "lucide-react";
import { StatCard } from "@/components/commerce/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { naira } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { BlogApprovalsTable, type ApprovalRow } from "@/components/admin/blog-approvals-table";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const PROGRAM_COLORS: Record<string, string> = {
  Agriculture: "#1A6B3C",
  Textile: "#2E9B5A",
  Medicine: "#F5C518",
  Technology: "#9AA3AE",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: userCount },
    { count: productCount },
    { count: pendingBlogCount },
    { data: revenueRows },
    { data: rawApprovals },
    { data: revenueByProgram },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).neq("role", "admin"),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase
      .from("orders")
      .select("total")
      .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase
      .from("blogs")
      .select("id, title, category, created_at, status, profiles(first_name, last_name)")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("products")
      .select("category"),
  ]);

  const monthRevenue = revenueRows?.reduce((sum, o) => sum + ((o as { total: number }).total ?? 0), 0) ?? 0;

  const approvalRows: ApprovalRow[] = (rawApprovals ?? []).map((r) => {
    const raw = r as unknown as { profiles?: { first_name: string | null; last_name: string | null } | { first_name: string | null; last_name: string | null }[] | null };
    const profileData = Array.isArray(raw.profiles) ? raw.profiles[0] : raw.profiles;
    const author = profileData
      ? `${profileData.first_name ?? ""} ${profileData.last_name ?? ""}`.trim() || null
      : null;
    return {
      id: r.id as string,
      title: r.title as string,
      category: r.category as string | null,
      created_at: r.created_at as string | null,
      status: r.status as string,
      author,
    };
  });

  const pendingCount = approvalRows.filter((r) => r.status === "pending").length;

  // Revenue by program from products categories
  const categoryCounts: Record<string, number> = {};
  (revenueByProgram ?? []).forEach((p) => {
    const cat = (p as { category: string | null }).category ?? "Other";
    categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
  });
  const totalProducts = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;
  const cats = Object.entries(categoryCounts)
    .map(([n, v]) => ({ n, v: Math.round((v / totalProducts) * 100), color: PROGRAM_COLORS[n] ?? "#9AA3AE" }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 4);

  return (
    <div className="p-7 flex flex-col gap-6">
      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Users"
          value={userCount != null ? userCount.toLocaleString() : "—"}
          icon={<Users size={18} />}
        />
        <StatCard
          label="Products"
          value={productCount != null ? productCount.toLocaleString() : "—"}
          icon={<Package size={18} />}
        />
        <StatCard
          label="Revenue (mo)"
          value={monthRevenue > 0 ? naira(monthRevenue) : "—"}
          icon={<Wallet size={18} />}
        />
        <StatCard
          label="Pending Approvals"
          value={pendingBlogCount != null ? String(pendingBlogCount) : "—"}
          delta={pendingBlogCount ? "Needs review" : undefined}
          deltaTone="error"
          icon={<Bell size={18} />}
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <Card padding="none" className="overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-200">
            <h3 className="font-sans font-bold text-base text-ink">Orders This Week</h3>
          </div>
          <div className="p-6 flex items-end gap-4 h-52">
            {DAYS.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full max-w-9 rounded-t-md bg-ink-200"
                  style={{ height: "20%" }}
                />
                <span className="text-xs text-ink-400 font-sans">{day}</span>
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
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${c.v}%`, background: c.color }}
                  />
                </div>
              </div>
            )) : (
              <p className="text-sm text-ink-400 font-sans">No product data yet.</p>
            )}
          </div>
        </Card>
      </div>

      {/* Blog approvals */}
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200">
          <h3 className="font-sans font-bold text-base text-ink">Blog Approvals</h3>
          {pendingCount > 0 && (
            <Badge tone="warning" size="sm">{pendingCount} pending</Badge>
          )}
        </div>
        <BlogApprovalsTable initialRows={approvalRows} />
      </Card>
    </div>
  );
}
