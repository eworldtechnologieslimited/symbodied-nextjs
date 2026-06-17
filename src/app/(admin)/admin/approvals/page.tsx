"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";

const INITIAL = [
  { id: 1, title: "The Dibia Pharmacopoeia", author: "Dr. Ada Eze", cat: "Medicine", date: "Jun 14", type: "blog", status: "pending" },
  { id: 2, title: "Reviving Yam Barns", author: "Chidi Nwosu", cat: "Agriculture", date: "Jun 13", type: "blog", status: "pending" },
  { id: 3, title: "From Loom to Runway", author: "Ngozi Okafor", cat: "Textile", date: "Jun 11", type: "blog", status: "approved" },
  { id: 4, title: "Solar Drying at Scale", author: "BrightField Tech", cat: "Technology", date: "Jun 10", type: "blog", status: "rejected" },
  { id: 5, title: "Cassava Processing Hub — Enugu", author: "Enugu Farmers Co-op", cat: "Agriculture", date: "Jun 9", type: "project", status: "pending" },
  { id: 6, title: "Akwete Weavers Training Centre", author: "Weavers Guild", cat: "Textile", date: "Jun 8", type: "project", status: "approved" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function AdminApprovalsPage() {
  const [rows, setRows] = useState(INITIAL);
  const setStatus = (id: number, status: string) => setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
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
                  <td className={`${td} font-semibold text-ink max-w-[180px]`}><span className="line-clamp-2">{r.title}</span></td>
                  <td className={td}>{r.author}</td>
                  <td className={td}><Badge tone="neutral" size="sm" className="capitalize">{r.type}</Badge></td>
                  <td className={td}><Badge tone="brand" size="sm">{r.cat}</Badge></td>
                  <td className={td}>{r.date}</td>
                  <td className={td}><StatusBadge status={r.status} /></td>
                  <td className={`${td} text-right`}>
                    {r.status === "pending" ? (
                      <div className="inline-flex gap-2">
                        <Button variant="primary" size="sm" onClick={() => setStatus(r.id, "approved")}>Approve</Button>
                        <Button variant="secondary" size="sm" onClick={() => setStatus(r.id, "rejected")}>Reject</Button>
                      </div>
                    ) : <span className="text-ink-400 text-sm">—</span>}
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
