"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { createClient } from "@/lib/supabase/client";

type ApprovalRow = {
  id: string;
  title: string;
  author: string | null;
  category: string | null;
  created_at: string | null;
  type: "blog" | "project";
  status: string;
};

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function AdminApprovalsPage() {
  const [rows, setRows] = useState<ApprovalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase
        .from("blogs")
        .select("id, title, category, created_at, status, profiles(first_name, last_name)")
        .order("created_at", { ascending: false }),
      supabase
        .from("projects")
        .select("id, name, category, created_at, status, profiles(first_name, last_name)")
        .order("created_at", { ascending: false }),
    ]).then(([blogsResult, projectsResult]) => {
      type ProfileJoin = { first_name: string | null; last_name: string | null };
      const getAuthor = (raw: unknown): string | null => {
        const r = raw as { profiles?: ProfileJoin | ProfileJoin[] | null };
        const p = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
        return p ? `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() || null : null;
      };

      const blogRows: ApprovalRow[] = (blogsResult.data ?? []).map((b) => ({
        id: (b as { id: string }).id,
        title: (b as { title: string }).title,
        author: getAuthor(b),
        category: (b as { category: string | null }).category,
        created_at: (b as { created_at: string | null }).created_at,
        type: "blog" as const,
        status: (b as { status: string }).status,
      }));

      const projectRows: ApprovalRow[] = (projectsResult.data ?? []).map((p) => ({
        id: (p as { id: string }).id,
        title: (p as { name?: string; title?: string }).name ?? (p as { title?: string }).title ?? "",
        author: getAuthor(p),
        category: (p as { category: string | null }).category,
        created_at: (p as { created_at: string | null }).created_at,
        type: "project" as const,
        status: (p as { status: string }).status,
      }));

      const combined = [...blogRows, ...projectRows].sort(
        (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
      );
      setRows(combined);
      setLoading(false);
    });
  }, []);

  const setStatus = async (id: string, type: "blog" | "project", status: "approved" | "rejected") => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const supabase = createClient();
    const table = type === "blog" ? "blogs" : "projects";
    await supabase.from(table).update({ status }).eq("id", id);
  };

  const pending = rows.filter((r) => r.status === "pending").length;

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">Content Approvals</h2>
        {pending > 0 && (
          <span className="flex items-center gap-2 text-sm text-warning font-sans font-semibold">
            <Bell size={16} /> {pending} pending
          </span>
        )}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">Loading approvals…</p>
          ) : rows.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No content to review.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Title</th>
                  <th className={th}>Author</th>
                  <th className={th}>Type</th>
                  <th className={th}>Category</th>
                  <th className={th}>Submitted</th>
                  <th className={th}>Status</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-ink-100 transition-colors">
                    <td className={`${td} font-semibold text-ink max-w-45`}>
                      <span className="line-clamp-2">{r.title}</span>
                    </td>
                    <td className={td}>{r.author ?? "—"}</td>
                    <td className={td}>
                      <Badge tone="neutral" size="sm" className="capitalize">{r.type}</Badge>
                    </td>
                    <td className={td}>
                      <Badge tone="brand" size="sm">{r.category ?? "—"}</Badge>
                    </td>
                    <td className={td}>{formatDate(r.created_at)}</td>
                    <td className={td}><StatusBadge status={r.status} /></td>
                    <td className={`${td} text-right`}>
                      {r.status === "pending" ? (
                        <div className="inline-flex gap-2">
                          <Button variant="primary" size="sm" onClick={() => setStatus(r.id, r.type, "approved")}>
                            Approve
                          </Button>
                          <Button variant="secondary" size="sm" onClick={() => setStatus(r.id, r.type, "rejected")}>
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-ink-400 text-sm">—</span>
                      )}
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
