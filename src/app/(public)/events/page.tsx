"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/commerce/event-card";
import { toast } from "sonner";

const ALL_EVENTS = [
  { id: "e1", day: "24", month: "AUG", theme: "Cultural Programming", name: "Igbo Heritage & Agritech Summit", venue: "Eko Convention Centre", location: "Lagos", slotsLeft: 42 },
  { id: "e2", day: "07", month: "SEP", theme: "Marketplace", name: "Diaspora Vendor Expo 2026", venue: "Landmark Centre", location: "Lagos", slotsLeft: 15 },
  { id: "e3", day: "19", month: "SEP", theme: "Medicine", name: "Traditional Medicine Symposium", venue: "UNN Conference Hall", location: "Nsukka", slotsLeft: 88 },
  { id: "e4", day: "02", month: "OCT", theme: "Agriculture", name: "Smallholder Farmers Forum", venue: "Enugu State Exhibition Centre", location: "Enugu", slotsLeft: 120 },
  { id: "e5", day: "15", month: "OCT", theme: "Textile", name: "West African Craft & Textile Fair", venue: "National Theatre", location: "Lagos", slotsLeft: 60 },
  { id: "e6", day: "08", month: "NOV", theme: "Technology", name: "Agritech Innovation Challenge", venue: "CcHUB", location: "Lagos", slotsLeft: 30 },
];

const MONTHS = ["All", "AUG", "SEP", "OCT", "NOV"];

export default function EventsPage() {
  const [activeMonth, setActiveMonth] = useState("All");
  const filtered = ALL_EVENTS.filter((e) => activeMonth === "All" || e.month === activeMonth);

  return (
    <div>
      <section className="bg-ink-100 border-b border-ink-200">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-14">
          <Badge tone="brand" className="mb-4">Events Calendar</Badge>
          <h1 className="font-display font-bold text-4xl text-ink tracking-tight">What's On</h1>
          <p className="mt-2 text-ink-600 font-sans text-base max-w-lg">
            Summits, expos, workshops, and community gatherings across the continent and diaspora.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {MONTHS.map((m) => (
              <button
                key={m}
                onClick={() => setActiveMonth(m)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold font-sans transition-colors duration-200 border ${activeMonth === m ? "bg-brand text-white border-brand" : "bg-white text-ink-600 border-ink-200 hover:border-brand hover:text-brand"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-sm text-ink-500 font-sans mb-6"><strong className="text-ink">{filtered.length}</strong> upcoming events</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((e) => (
              <EventCard key={e.id} {...e} onRSVP={() => toast.success(`RSVP'd for "${e.name}"!`)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
