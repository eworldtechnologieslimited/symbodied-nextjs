import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { ProductCard } from "@/components/commerce/product-card";

type SavedProduct = {
  id: string; slug: string; name: string; category: string;
  vendor: string; price: number; unit: string; location: string;
  image?: string; seed?: number;
};

export default async function SavedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const service = createServiceClient();
  const { data: savedItems } = await service
    .from("saved_items")
    .select("id, products(id, slug, name, category, price, unit, location, vendor, image)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const products: SavedProduct[] = (savedItems ?? [])
    .map((item) => {
      const raw = item as unknown as { products?: SavedProduct | SavedProduct[] | null };
      const p = Array.isArray(raw.products) ? raw.products[0] : raw.products;
      return p ?? null;
    })
    .filter((p): p is SavedProduct => p !== null);

  return (
    <div className="p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans font-bold text-xl text-ink">Saved Items</h2>
        <span className="text-sm text-ink-500 font-sans">
          <strong className="text-ink">{products.length}</strong> saved
        </span>
      </div>
      {products.length === 0 ? (
        <p className="text-sm text-ink-400 font-sans text-center py-12">
          No saved items yet. Browse the{" "}
          <Link href="/shop" className="text-brand hover:underline">shop</Link>{" "}
          and save products you love.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Link key={p.id} href={`/shop/${p.slug}`}>
              <ProductCard {...p} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
