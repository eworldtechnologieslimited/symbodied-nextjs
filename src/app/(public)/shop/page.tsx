"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { products } from "@/lib/data";
import { toast } from "sonner";
import { Search } from "lucide-react";

const CATEGORIES = ["All", "Agriculture", "Textile", "Medicine", "Technology"];
const LOCATIONS = ["Nigeria", "Ghana", "Kenya", "Diaspora"];
const SORTS = ["Newest", "Price: Low → High", "Price: High → Low", "Most Popular"];

export default function ShopPage() {
  const addItem = useCart((s) => s.addItem);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Newest");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.vendor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-ink-100 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-ink-200">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-10">
          <h1 className="font-display font-bold text-4xl text-ink tracking-tight">Shop the Marketplace</h1>
          <p className="mt-2 text-ink-600 font-sans text-base">
            Fresh produce, heritage textiles, and more — direct from vendors across the diaspora.
          </p>
          <div className="mt-6 max-w-lg">
            <Input
              placeholder="Search products, vendors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leadingIcon={<Search size={16} />}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Sidebar filters */}
          <Card padding="lg" className="lg:sticky lg:top-24">
            <h3 className="text-sm font-bold text-ink font-sans mb-4 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Filters
            </h3>

            {/* Category */}
            <div className="pb-5 mb-5 border-b border-ink-200">
              <h4 className="text-xs font-bold text-ink-600 uppercase tracking-wide mb-3 font-sans">Category</h4>
              {CATEGORIES.map((c) => (
                <label key={c} className="flex items-center gap-3 py-1.5 cursor-pointer text-sm font-sans text-ink-600 hover:text-ink">
                  <span
                    onClick={() => setActiveCategory(c)}
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                      activeCategory === c ? "bg-brand border-brand" : "border-ink-300 bg-white"
                    }`}
                  >
                    {activeCategory === c && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span className="flex-1" onClick={() => setActiveCategory(c)}>{c}</span>
                  <span className="text-ink-400 text-xs">
                    {c === "All" ? products.length : products.filter((p) => p.category === c).length}
                  </span>
                </label>
              ))}
            </div>

            {/* Price range (visual only) */}
            <div className="pb-5 mb-5 border-b border-ink-200">
              <h4 className="text-xs font-bold text-ink-600 uppercase tracking-wide mb-3 font-sans">Price Range</h4>
              <div className="relative h-1 bg-ink-200 rounded-full mx-1 my-4">
                <div className="absolute left-[10%] right-[35%] h-full bg-brand rounded-full" />
                <span className="absolute left-[10%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand shadow-sm" />
                <span className="absolute left-[65%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand shadow-sm" />
              </div>
              <div className="flex justify-between text-xs text-ink-500 font-sans">
                <span>₦5,000</span><span>₦120,000</span>
              </div>
            </div>

            {/* Location */}
            <div className="pb-5 mb-5 border-b border-ink-200">
              <h4 className="text-xs font-bold text-ink-600 uppercase tracking-wide mb-3 font-sans">Location</h4>
              {LOCATIONS.map((l, i) => (
                <label key={l} className="flex items-center gap-3 py-1.5 cursor-pointer text-sm font-sans text-ink-600">
                  <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${i === 0 ? "bg-brand border-brand" : "border-ink-300"}`}>
                    {i === 0 && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}
                  </span>
                  {l}
                </label>
              ))}
            </div>

            <Button variant="secondary" size="sm" fullWidth onClick={() => { setActiveCategory("All"); setSearch(""); }}>
              Clear filters
            </Button>
          </Card>

          {/* Product grid */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-ink-500 font-sans">
                <strong className="text-ink">{filtered.length}</strong> products
              </span>
              <div className="flex items-center gap-2 text-sm font-sans text-ink-600">
                Sort:
                <button className="font-semibold text-ink flex items-center gap-1">
                  {activeSort} <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    {...p}
                    onAddToCart={() => {
                      addItem({ id: p.id, name: p.name, price: p.price, unit: p.unit, vendor: p.vendor, seed: p.seed });
                      toast.success(`${p.name.slice(0, 30)}… added to cart`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-brand-light flex items-center justify-center text-brand">
                  <Search size={28} />
                </div>
                <h3 className="font-sans font-bold text-lg text-ink">No products found</h3>
                <p className="text-ink-500 font-sans text-sm max-w-xs">Try adjusting your search or filters to find what you're looking for.</p>
                <Button variant="secondary" size="sm" onClick={() => { setActiveCategory("All"); setSearch(""); }}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
