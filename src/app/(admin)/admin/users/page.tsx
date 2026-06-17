"use client";

import { useEffect, useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { createClient } from "@/lib/supabase/client";

type UserRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string | null;
  role: string;
  status: string;
  created_at: string | null;
};

const ROLE_TONE: Record<string, "brand" | "gold" | "neutral"> = { user: "neutral", vendor: "brand", admin: "gold" };

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

function displayName(u: UserRow) {
  const name = `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim();
  return name || u.username || u.email || "Unknown";
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("id, first_name, last_name, email, username, role, status, created_at")
      .neq("role", "admin")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setUsers((data as UserRow[]) ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      displayName(u).toLowerCase().includes(q) ||
      (u.email ?? "").toLowerCase().includes(q) ||
      (u.username ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">Users</h2>
        <Button variant="primary" size="sm" leadingIcon={<UserPlus size={15} />}>Invite User</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length },
          { label: "Members", value: users.filter((u) => u.role === "user").length },
          { label: "Vendors", value: users.filter((u) => u.role === "vendor").length },
          { label: "Suspended", value: users.filter((u) => u.status === "suspended").length },
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
        <div className="px-5 py-4 border-b border-ink-200 max-w-xs">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leadingIcon={<Search size={15} />}
          />
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">Loading users…</p>
          ) : filtered.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No users found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>User</th>
                  <th className={th}>Username</th>
                  <th className={th}>Role</th>
                  <th className={th}>Joined</th>
                  <th className={th}>Status</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-ink-100 transition-colors">
                    <td className={td}>
                      <div className="flex items-center gap-3">
                        <Avatar name={displayName(u)} size="sm" />
                        <div>
                          <div className="font-semibold text-ink text-sm">{displayName(u)}</div>
                          <div className="text-xs text-ink-500">{u.email ?? "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td className={td}>{u.username ? `@${u.username}` : "—"}</td>
                    <td className={td}>
                      <Badge tone={ROLE_TONE[u.role] ?? "neutral"} size="sm" className="capitalize">
                        {u.role}
                      </Badge>
                    </td>
                    <td className={td}>{formatDate(u.created_at)}</td>
                    <td className={td}><StatusBadge status={u.status ?? "active"} /></td>
                    <td className={`${td} text-right`}>
                      <div className="inline-flex gap-1">
                        <Button variant="ghost" size="sm">View</Button>
                        {u.status !== "suspended" && (
                          <Button variant="ghost" size="sm" className="text-error">Suspend</Button>
                        )}
                      </div>
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
