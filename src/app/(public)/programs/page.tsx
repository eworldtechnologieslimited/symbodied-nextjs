import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, LayoutGrid, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/commerce/section-header";
import { ProductCard } from "@/components/commerce/product-card";
import { programs, products } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={28} />, Heart: <Heart size={28} />, LayoutGrid: <LayoutGrid size={28} />, Package: <Package size={28} />,
};

const HERO_IMAGES: Record<string, string> = {
  agriculture: "/images/static/agric_hero.jpg",
  medicine: "/images/static/medcine_hero.jpg",
  technology: "/images/static/technology_hero.jpg",
  textile: "/images/static/textile_hero.jpg",
};

export default function ProgramsPage() {
  return (
    <div>
      <section className="bg-brand-light border-b border-ink-200">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-16 text-center">
          <Badge tone="brand" leadingIcon={<Leaf size={13} />} className="mb-5">Our Programs</Badge>
          <h1 className="font-display font-bold text-[clamp(2.25rem,5vw,3.5rem)] tracking-tight text-ink">
            Four Pillars of Indigenous Empowerment
          </h1>
          <p className="mt-4 text-lg text-ink-600 font-sans max-w-xl mx-auto leading-relaxed">
            Rooted in the Dibia tradition, our four program areas channel commerce into lasting cultural and economic impact.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((p) => (
              <Card key={p.slug} padding="none" hoverable className="overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <Image src={HERO_IMAGES[p.slug]} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-ink/30" />
                  <div className="absolute bottom-5 left-5">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white">
                      {ICONS[p.icon]}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-sans font-bold text-xl text-ink mb-2">{p.name}</h2>
                  <p className="text-ink-600 font-sans text-sm leading-relaxed mb-4">{p.desc}</p>
                  <Link href={`/programs/${p.slug}`}>
                    <Button variant="primary" size="sm" trailingIcon={<ArrowRight size={15} />}>Explore {p.name}</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink-100">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <SectionHeader
            overline="From All Programs"
            title="Featured Products"
            action={<Link href="/shop"><Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={15} />}>View all</Button></Link>}
            className="mb-8"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`}><ProductCard {...p} /></Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
