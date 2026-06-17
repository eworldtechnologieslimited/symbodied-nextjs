"use client";

import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";

const USERS = [
  { id: "u1", name: "Ada Obi", email: "ada.obi@example.com", role: "user", joined: "Jun 1, 2026", orders: 12, status: "active" },
  { id: "u2", name: "Ngozi Farms", email: "ngozi@farms.ng", role: "vendor", joined: "May 20, 2026", orders: 0, status: "active" },
  { id: "u3", name: "Chidi Nwosu", email: "chidi@nwosu.com", role: "user", joined: "May 14, 2026", orders: 4, status: "active" },
  { id: "u4", name: "BrightField Tech", email: "info@brightfield.ng", role: "vendor", joined: "Apr 30, 2026", orders: 0, status: "active" },
  { id: "u5", name: "Emeka Obi", email: "emeka.obi@gmail.com", role: "user", joined: "Apr 15, 2026", orders: 7, status: "suspended" },
];

const ROLE_TONE: Record<string, "brand" | "gold" | "neutral"> = { user: "neutral", vendor: "brand", admin: "gold" };

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = USERS.filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">Users</h2>
        <Button variant="primary" size="sm" leadingIcon={<UserPlus size={15} />}>Invite User</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: USERS.length },
          { label: "Members", value: USERS.filter((u) => u.role === "user").length },
          { label: "Vendors", value: USERS.filter((u) => u.role === "vendor").length },
          { label: "Suspended", value: USERS.filter((u) => u.status === "suspended").length },
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-ink leading-none">{s.value}</div>
            <div className="mt-1 text-xs text-ink-500 font-sans">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-200 max-w-xs">
          <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} leadingIcon={<Search size={15} />} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>User</th>
                <th className={th}>Role</th>
                <th className={th}>Joined</th>
                <th className={th}>Orders</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-ink-100 transition-colors">
                  <td className={td}>
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <div className="font-semibold text-ink text-sm">{u.name}</div>
                        <div className="text-xs text-ink-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={td}><Badge tone={ROLE_TONE[u.role]} size="sm" className="capitalize">{u.role}</Badge></td>
                  <td className={td}>{u.joined}</td>
                  <td className={td}>{u.orders}</td>
                  <td className={td}><StatusBadge status={u.status} /></td>
                  <td className={`${td} text-right`}>
                    <div className="inline-flex gap-1">
                      <Button variant="ghost" size="sm">View</Button>
                      {u.status !== "suspended" && <Button variant="ghost" size="sm" className="text-error">Suspend</Button>}
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
