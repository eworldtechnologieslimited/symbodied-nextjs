"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/commerce/blog-card";

const ALL_BLOGS = [
  { id: "b1", category: "Medicine", title: "The Dibia Pharmacopoeia: Documenting Igbo Herbal Knowledge", excerpt: "How communities are preserving centuries of botanical medicine for the next generation of healers.", author: "Dr. Ada Eze", date: "Jun 12, 2026", readTime: "6 min read", seed: 2, image: "/images/blogs/img_683c8bdbbd0ec.webp" },
  { id: "b2", category: "Agriculture", title: "Reviving Yam Barns: Storage Traditions That Still Work", excerpt: "Pre-colonial storage techniques are outperforming modern silos in humid climates.", author: "Chidi Nwosu", date: "Jun 8, 2026", readTime: "4 min read", seed: 0, image: "/images/blogs/img_683c97d33a54b.webp" },
  { id: "b3", category: "Textile", title: "From Loom to Runway: The Akwete Resurgence", excerpt: "A new generation of weavers is taking heritage cloth global without losing its soul.", author: "Ngozi Okafor", date: "Jun 2, 2026", readTime: "5 min read", seed: 3, image: "/images/blogs/img_683c9cfac47b4.webp" },
  { id: "b4", category: "Technology", title: "Solar Drying at Scale: What Smallholders Need to Know", excerpt: "BrightField Tech breaks down how solar food dryers can cut post-harvest losses by up to 40%.", author: "BrightField", date: "May 28, 2026", readTime: "7 min read", seed: 1, image: undefined },
  { id: "b5", category: "Agriculture", title: "The Hidden Economics of Cassava Processing", excerpt: "Why raw cassava exports leave money on the table — and how local mills change everything.", author: "Emeka Obi", date: "May 20, 2026", readTime: "5 min read", seed: 0, image: undefined },
  { id: "b6", category: "Medicine", title: "Bitter Leaf and Metabolic Syndrome: What Research Says", excerpt: "A review of emerging evidence behind traditional uses of Vernonia amygdalina in metabolic health.", author: "Dr. Kemi Lawal", date: "May 15, 2026", readTime: "8 min read", seed: 2, image: undefined },
];

const CATS = ["All", "Agriculture", "Medicine", "Textile", "Technology"];

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ALL_BLOGS.filter((b) => {
    const matchCat = active === "All" || b.category === active;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <section className="bg-brand-light border-b border-ink-200">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-14">
          <Badge tone="brand" className="mb-4">Articles & Insights</Badge>
          <h1 className="font-display font-bold text-4xl text-ink tracking-tight">From the Community</h1>
          <p className="mt-2 text-ink-600 font-sans text-base max-w-lg">
            Perspectives, research, and stories from vendors, practitioners, and community members.
          </p>
          <div className="mt-6 max-w-sm">
            <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} leadingIcon={<Search size={16} />} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
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
          <p className="text-sm text-ink-500 font-sans mb-6">
            <strong className="text-ink">{filtered.length}</strong> articles
          </p>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((b) => (
                <Link key={b.id} href={`/blog/${b.id}`}>
                  <BlogCard {...b} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-ink-500 font-sans">No articles match your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
