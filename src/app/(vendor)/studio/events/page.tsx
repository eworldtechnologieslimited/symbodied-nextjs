import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";

const EVENTS = [
  { id: "e1", name: "Diaspora Vendor Expo 2026", theme: "Marketplace", date: "Sep 7, 2026", venue: "Landmark Centre, Lagos", slots: 200, rsvps: 185, status: "active" },
  { id: "e2", name: "West African Craft Workshop", theme: "Textile", date: "Oct 15, 2026", venue: "National Theatre, Lagos", slots: 80, rsvps: 20, status: "draft" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function StudioEventsPage() {
  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">My Events</h2>
        <Button variant="primary" size="sm" leadingIcon={<Plus size={15} />}>Create Event</Button>
      </div>
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Event</th>
                <th className={th}>Theme</th>
                <th className={th}>Date</th>
                <th className={th}>Venue</th>
                <th className={th}>RSVPs</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {EVENTS.map((e) => (
                <tr key={e.id} className="hover:bg-ink-100 transition-colors">
                  <td className={`${td} font-semibold text-ink`}>{e.name}</td>
                  <td className={td}><Badge tone="neutral" size="sm">{e.theme}</Badge></td>
                  <td className={td}>{e.date}</td>
                  <td className={td}>{e.venue}</td>
                  <td className={td}>{e.rsvps}/{e.slots}</td>
                  <td className={td}><StatusBadge status={e.status} /></td>
                  <td className={`${td} text-right`}><Button variant="ghost" size="sm">Manage</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
