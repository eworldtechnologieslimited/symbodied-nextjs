"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { createClient } from "@/lib/supabase/client";

export type ApprovalRow = {
  id: string;
  title: string;
  category: string | null;
  created_at: string | null;
  status: string;
  author?: string | null;
};

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function BlogApprovalsTable({ initialRows }: { initialRows: ApprovalRow[] }) {
  const [rows, setRows] = useState(initialRows);

  const setStatus = async (id: string, status: "approved" | "rejected") => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const supabase = createClient();
    await supabase.from("blogs").update({ status }).eq("id", id);
  };

  if (rows.length === 0) {
    return (
      <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No blog posts to review.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={th}>Title</th>
            <th className={th}>Author</th>
            <th className={th}>Category</th>
            <th className={th}>Submitted</th>
            <th className={th}>Status</th>
            <th className={`${th} text-right`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-ink-100 transition-colors">
              <td className={`${td} font-semibold text-ink`}>{r.title}</td>
              <td className={td}>{r.author ?? "—"}</td>
              <td className={td}><Badge tone="brand" size="sm">{r.category ?? "—"}</Badge></td>
              <td className={td}>{formatDate(r.created_at)}</td>
              <td className={td}><StatusBadge status={r.status} /></td>
              <td className={`${td} text-right`}>
                {r.status === "pending" ? (
                  <div className="inline-flex gap-2 justify-end">
                    <Button variant="primary" size="sm" onClick={() => setStatus(r.id, "approved")}>Approve</Button>
                    <Button variant="secondary" size="sm" onClick={() => setStatus(r.id, "rejected")}>Reject</Button>
                  </div>
                ) : (
                  <span className="text-ink-400 text-sm">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
