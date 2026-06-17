import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Leaf, Heart, LayoutGrid, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/commerce/section-header";
import { ProductCard } from "@/components/commerce/product-card";
import { BlogCard } from "@/components/commerce/blog-card";
import { programs, products, blogs } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={26} />, Heart: <Heart size={26} />, LayoutGrid: <LayoutGrid size={26} />, Package: <Package size={26} />,
};

const HERO_IMAGES: Record<string, string> = {
  agriculture: "/images/static/agric_hero.jpg",
  medicine: "/images/static/medcine_hero.jpg",
  technology: "/images/static/technology_hero.jpg",
  textile: "/images/static/textile_hero.jpg",
};

const DETAILS: Record<string, { headline: string; body: string; stats: { v: string; l: string }[] }> = {
  agriculture: {
    headline: "Feeding Communities, Preserving the Land",
    body: "From yam barns to cassava mills, Symbodied's Agriculture programme connects smallholder farmers to markets, documents indigenous growing methods, and channels investment into rural processing infrastructure. Every product sold through this channel keeps value within farming communities.",
    stats: [{ v: "240+", l: "Vendors" }, { v: "5,000+", l: "Products" }, { v: "18", l: "States" }, { v: "₦28M+", l: "GMV" }],
  },
  medicine: {
    headline: "Healing Knowledge That Has Lasted Millennia",
    body: "The Dibia tradition placed medicine at the centre of community life. Our Medicine programme documents herbal knowledge, verifies traditional practitioners, and connects communities to authentic botanical remedies — preserving what centuries of lived experience has proven effective.",
    stats: [{ v: "80+", l: "Practitioners" }, { v: "400+", l: "Remedies listed" }, { v: "12", l: "Ethnic groups" }, { v: "₦5M+", l: "GMV" }],
  },
  technology: {
    headline: "Digital Tools Rooted in Local Needs",
    body: "Technology should serve communities, not extract from them. Our Technology programme funds solar solutions, digital literacy training, and appropriate-technology tools designed for African contexts — by African innovators who understand the landscape.",
    stats: [{ v: "35+", l: "Tech Vendors" }, { v: "12", l: "Solar Projects" }, { v: "6,000+", l: "Users Trained" }, { v: "₦12M+", l: "Projects Funded" }],
  },
  textile: {
    headline: "Weaving Culture into Every Thread",
    body: "From Akwete cloth to Adire indigo-dyeing, African textile traditions are living arts. Our Textile programme supports artisan weavers, documents techniques at risk of being lost, and creates global market access for heritage fabrics without extracting ownership from the artisans.",
    stats: [{ v: "120+", l: "Artisans" }, { v: "800+", l: "Products" }, { v: "25", l: "Weaving traditions" }, { v: "₦9M+", l: "GMV" }],
  },
};

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const details = DETAILS[slug];
  const relatedProducts = products.filter((p) => p.category.toLowerCase() === program.name.toLowerCase());
  const relatedBlogs = blogs.filter((b) => b.category.toLowerCase() === program.name.toLowerCase());

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[420px] flex items-end">
        <Image src={HERO_IMAGES[slug]} alt={program.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent" />
        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 pb-14 w-full">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white mb-4">
            {ICONS[program.icon]}
          </span>
          <Badge tone="gold" className="mb-3">{program.name}</Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl">
            {details.headline}
          </h1>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-brand">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {details.stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display font-bold text-3xl text-white leading-none">{s.v}</div>
              <div className="mt-1 text-sm text-white/70 font-sans">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body text */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-lg text-ink-600 font-sans leading-[1.8]">{details.body}</p>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-ink-100">
          <div className="max-w-[var(--container-max)] mx-auto px-6">
            <SectionHeader
              overline={program.name}
              title={`${program.name} Products`}
              action={<Link href={`/shop?category=${program.name}`}><Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={15} />}>View all</Button></Link>}
              className="mb-8"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/shop/${p.slug}`}><ProductCard {...p} /></Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-[var(--container-max)] mx-auto px-6">
            <SectionHeader overline="Articles" title="From the Community" className="mb-8" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedBlogs.map((b) => (
                <Link key={b.id} href={`/blog/${b.id}`}><BlogCard {...b} /></Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-[var(--container-max)] mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-ink mb-4">Support {program.name} in your community</h2>
          <p className="text-ink-600 font-sans mb-7 max-w-md mx-auto">Browse community-funded projects or shop directly from verified vendors.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/shop"><Button variant="primary">Shop Now</Button></Link>
            <Link href="/projects"><Button variant="secondary">Fund a Project</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
