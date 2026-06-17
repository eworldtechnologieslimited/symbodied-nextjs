"use client";

import { useState } from "react";
import { Users, Package, Wallet, Bell, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/commerce/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { naira } from "@/lib/utils";

const APPROVAL_ROWS = [
  { id: 1, title: "The Dibia Pharmacopoeia", author: "Dr. Ada Eze", cat: "Medicine", date: "Jun 14", status: "pending" },
  { id: 2, title: "Reviving Yam Barns", author: "Chidi Nwosu", cat: "Agriculture", date: "Jun 13", status: "pending" },
  { id: 3, title: "From Loom to Runway", author: "Ngozi Okafor", cat: "Textile", date: "Jun 11", status: "approved" },
  { id: 4, title: "Solar Drying at Scale", author: "BrightField", cat: "Technology", date: "Jun 10", status: "rejected" },
];

const BARS = [40, 65, 52, 80, 72, 95, 88];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const CATS = [
  { n: "Agriculture", v: 48, color: "#1A6B3C" },
  { n: "Textile", v: 26, color: "#2E9B5A" },
  { n: "Medicine", v: 16, color: "#F5C518" },
  { n: "Technology", v: 10, color: "#9AA3AE" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function AdminDashboardPage() {
  const [rows, setRows] = useState(APPROVAL_ROWS);
  const setStatus = (id: number, status: string) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div className="p-7 flex flex-col gap-6">
      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Users" value="8,412" delta="+124 this week" icon={<Users size={18} />} />
        <StatCard label="Products" value="10,238" icon={<Package size={18} />} />
        <StatCard label="Revenue (mo)" value={naira(23800000)} delta="+9%" icon={<Wallet size={18} />} />
        <StatCard label="Pending Approvals" value={String(pendingCount)} delta="Needs review" deltaTone="error" icon={<Bell size={18} />} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <Card padding="none" className="overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-200">
            <h3 className="font-sans font-bold text-base text-ink">Orders This Week</h3>
          </div>
          <div className="p-6 flex items-end gap-4 h-52">
            {BARS.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full max-w-9 rounded-t-md transition-all duration-500"
                  style={{ height: `${b}%`, background: "linear-gradient(180deg, #2E9B5A, #1A6B3C)" }}
                />
                <span className="text-xs text-ink-400 font-sans">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="none" className="overflow-hidden">
          <div className="px-5 py-4 border-b border-ink-200">
            <h3 className="font-sans font-bold text-base text-ink">Revenue by Program</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {CATS.map((c) => (
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
            ))}
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
                  <td className={td}>{r.author}</td>
                  <td className={td}><Badge tone="brand" size="sm">{r.cat}</Badge></td>
                  <td className={td}>{r.date}</td>
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
      </Card>
    </div>
  );
}
