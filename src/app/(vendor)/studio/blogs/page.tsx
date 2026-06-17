import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function StudioBlogsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const service = createServiceClient();
  const { data: blogs } = await service
    .from("blogs")
    .select("id, title, category, created_at, status, views")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">My Blog Posts</h2>
        <Button variant="primary" size="sm" leadingIcon={<Plus size={15} />}>New Post</Button>
      </div>
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          {!blogs || blogs.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-400 font-sans text-center">No blog posts yet.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Title</th>
                  <th className={th}>Category</th>
                  <th className={th}>Published</th>
                  <th className={th}>Views</th>
                  <th className={th}>Status</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b.id as string} className="hover:bg-ink-100 transition-colors">
                    <td className={`${td} font-semibold text-ink max-w-xs`}>
                      <span className="line-clamp-2">{b.title as string}</span>
                    </td>
                    <td className={td}><Badge tone="brand" size="sm">{(b.category as string) ?? "—"}</Badge></td>
                    <td className={td}>{formatDate(b.created_at as string | null)}</td>
                    <td className={td}>
                      {b.status === "approved" ? ((b.views as number) ?? 0).toLocaleString() : "—"}
                    </td>
                    <td className={td}><StatusBadge status={b.status as string} /></td>
                    <td className={`${td} text-right`}>
                      <div className="inline-flex gap-1">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Preview</Button>
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
