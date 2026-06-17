import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { naira, pct } from "@/lib/utils";

const DONATIONS = [
  { project: "Cassava Processing Hub — Enugu", category: "Agriculture", amount: 50000, target: 5000000, raised: 3200000, date: "Jun 10, 2026", status: "active" },
  { project: "Rural Cold-Storage Network", category: "Technology", amount: 25000, target: 12000000, raised: 7800000, date: "May 30, 2026", status: "active" },
  { project: "Akwete Weavers Training Centre", category: "Textile", amount: 10000, target: 2500000, raised: 2500000, date: "May 14, 2026", status: "completed" },
];

const th = "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 border-b border-ink-200 bg-ink-100 font-sans";
const td = "px-5 py-4 text-sm text-ink-600 border-b border-ink-200 font-sans";

export default function DonationsPage() {
  const total = DONATIONS.reduce((s, d) => s + d.amount, 0);
  return (
    <div className="p-7 flex flex-col gap-6">
      <h2 className="font-sans font-bold text-xl text-ink">My Donations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[{ label: "Total donated", value: naira(total) }, { label: "Projects backed", value: String(DONATIONS.length) }, { label: "Active projects", value: "2" }].map((s) => (
          <Card key={s.label} padding="md">
            <div className="font-display font-bold text-2xl text-ink leading-none">{s.value}</div>
            <div className="mt-1 text-xs text-ink-500 font-sans">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>Project</th>
                <th className={th}>Category</th>
                <th className={th}>My Donation</th>
                <th className={th}>Progress</th>
                <th className={th}>Date</th>
                <th className={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {DONATIONS.map((d) => (
                <tr key={d.project} className="hover:bg-ink-100 transition-colors">
                  <td className={`${td} font-semibold text-ink max-w-[200px]`}><span className="line-clamp-2">{d.project}</span></td>
                  <td className={td}>{d.category}</td>
                  <td className={`${td} font-semibold text-brand`}>{naira(d.amount)}</td>
                  <td className={td}>
                    <div className="w-28">
                      <div className="text-xs font-sans mb-1">{pct(d.raised, d.target)}%</div>
                      <ProgressBar value={pct(d.raised, d.target)} color="gold" size="sm" />
                    </div>
                  </td>
                  <td className={td}>{d.date}</td>
                  <td className={td}><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
