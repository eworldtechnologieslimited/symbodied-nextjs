"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/commerce/project-card";
import { projects } from "@/lib/data";

const ALL_PROJECTS = [
  ...projects,
  { id: "pr4", category: "Medicine", name: "Dibia Documentation Archive", summary: "Recording and digitising over 500 years of Igbo herbal medicine practice.", raised: 800000, target: 3000000, creator: "Heritage Foundation", daysLeft: 45, seed: 2, image: undefined },
  { id: "pr5", category: "Agriculture", name: "Rainwater Harvesting — Kogi", summary: "Installing community cisterns across 12 farming villages to reduce water stress.", raised: 2100000, target: 4000000, creator: "GreenKogi NGO", daysLeft: 22, seed: 0, image: undefined },
  { id: "pr6", category: "Technology", name: "Village Wi-Fi Mesh Network", summary: "Bringing community internet access to 8 underserved villages in Osun.", raised: 5500000, target: 8000000, creator: "TechForAll", daysLeft: 60, seed: 1, image: undefined },
];

const CATS = ["All", "Agriculture", "Medicine", "Technology", "Textile"];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const filtered = ALL_PROJECTS.filter((p) => active === "All" || p.category === active);

  return (
    <div>
      <section className="bg-ink-100 border-b border-ink-200">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-14">
          <Badge tone="brand" className="mb-4">Community Projects</Badge>
          <h1 className="font-display font-bold text-4xl text-ink tracking-tight">Fund the Future</h1>
          <p className="mt-2 text-ink-600 font-sans text-base max-w-lg">
            Back initiatives that turn tradition into livelihoods. Every naira supports real communities.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold font-sans transition-colors duration-200 border ${active === c ? "bg-brand text-white border-brand" : "bg-white text-ink-600 border-ink-200 hover:border-brand hover:text-brand"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <p className="text-sm text-ink-500 font-sans mb-6"><strong className="text-ink">{filtered.length}</strong> active projects</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => <ProjectCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand">
        <div className="max-w-[var(--container-max)] mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-3">Have a project to fund?</h2>
          <p className="text-white/80 font-sans mb-7 max-w-md mx-auto">Verified vendors and community organisations can submit projects for crowdfunding on Symbodied.</p>
          <Link href="/signup"><Button variant="gold" size="lg">Start a Project</Button></Link>
        </div>
      </section>
    </div>
  );
}
