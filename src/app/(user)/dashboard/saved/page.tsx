import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/commerce/product-card";
import { products } from "@/lib/data";

const SAVED = products.slice(0, 4);

export default function SavedPage() {
  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">Saved Items</h2>
        <span className="text-sm text-ink-500 font-sans"><strong className="text-ink">{SAVED.length}</strong> saved</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SAVED.map((p) => (
          <Link key={p.id} href={`/shop/${p.slug}`}><ProductCard {...p} /></Link>
        ))}
      </div>
    </div>
  );
}
