import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";

const BLOGS = [
  { id: "b1", title: "The Dibia Pharmacopoeia: Documenting Igbo Herbal Knowledge", category: "Medicine", date: "Jun 12, 2026", status: "approved", views: 1240 },
  { id: "b2", title: "Reviving Yam Barns: Storage Traditions That Still Work", category: "Agriculture", date: "Jun 8, 2026", status: "approved", views: 820 },
  { id: "b3", title: "From Loom to Runway: The Akwete Resurgence", category: "Textile", date: "Jun 2, 2026", status: "pending", views: 0 },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function StudioBlogsPage() {
  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">My Blog Posts</h2>
        <Button variant="primary" size="sm" leadingIcon={<Plus size={15} />}>New Post</Button>
      </div>
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
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
              {BLOGS.map((b) => (
                <tr key={b.id} className="hover:bg-ink-100 transition-colors">
                  <td className={`${td} font-semibold text-ink max-w-xs`}><span className="line-clamp-2">{b.title}</span></td>
                  <td className={td}><Badge tone="brand" size="sm">{b.category}</Badge></td>
                  <td className={td}>{b.date}</td>
                  <td className={td}>{b.status === "approved" ? b.views.toLocaleString() : "—"}</td>
                  <td className={td}><StatusBadge status={b.status} /></td>
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
        </div>
      </Card>
    </div>
  );
}
