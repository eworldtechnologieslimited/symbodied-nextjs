import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/commerce/section-header";
import { stats } from "@/lib/data";

const VALUES = [
  { icon: <Leaf size={22} />, title: "Tradition", desc: "We honour the knowledge systems, practices, and aesthetics of African heritage as the foundation of everything we build." },
  { icon: <Heart size={22} />, title: "Community", desc: "Every transaction on Symbodied is a vote for community-owned commerce — value stays local, people stay connected." },
  { icon: <Shield size={22} />, title: "Integrity", desc: "Vendors are verified. Products are authentic. Causes are vetted. Trust is the currency we protect above all." },
  { icon: <Globe size={22} />, title: "Solidarity", desc: "We connect diaspora supporters to the communities they come from, bridging continents through commerce and giving." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[480px] flex items-end">
        <Image src="/images/hero/odu_hero.jpg" alt="Symbodied community" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent" />
        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-6 pb-16 w-full">
          <Badge tone="gold" className="mb-4">Our Story</Badge>
          <h1 className="font-display font-bold text-5xl text-white tracking-tight leading-tight max-w-xl">
            Rooted in Tradition.<br />Built for the Future.
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeader overline="Our Mission" title="Empowering communities through culture and commerce" />
            <p className="mt-5 text-ink-600 font-sans leading-relaxed">
              Symbodied was founded on a simple conviction: that the traditions, knowledge systems, and goods of African communities have immense economic value — and that value should flow back to the communities that created them.
            </p>
            <p className="mt-4 text-ink-600 font-sans leading-relaxed">
              We take our name from the Dibia tradition of the Igbo people — the Dibia being keepers of ancestral wisdom, healers, and community anchors. Symbodied is that spirit, applied to modern commerce.
            </p>
            <blockquote className="mt-7 pl-5 border-l-[3px] border-brand font-display font-semibold text-xl text-ink leading-relaxed">
              "When tradition and trade move together, whole communities rise."
            </blockquote>
          </div>
          <div className="relative h-[440px] rounded-xl overflow-hidden">
            <Image src="/images/static/newMission.jpg" alt="Community mission" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-brand">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-4xl text-white leading-none">{s.value}</div>
              <div className="mt-1.5 text-sm text-white/70 font-sans">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <section className="py-20 md:py-28 bg-ink-100">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <SectionHeader align="center" overline="What we stand for" title="Our Core Values" className="mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <Card key={v.title} padding="lg" className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand mx-auto mb-4">
                  {v.icon}
                </span>
                <h3 className="font-sans font-bold text-lg text-ink mb-2">{v.title}</h3>
                <p className="text-sm text-ink-600 font-sans leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community photos */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <SectionHeader overline="Our Community" title="The people behind Symbodied" className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[5, 6, 7, 4].map((n) => (
              <div key={n} className="relative aspect-square rounded-xl overflow-hidden">
                <Image src={`/images/hero/community${n}.jpg`} alt={`Community photo ${n}`} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second mission image */}
      <section className="py-20 md:py-28 bg-ink-100">
        <div className="max-w-[var(--container-max)] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="/images/static/mission_2.jpg" alt="Our work in the field" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div>
            <SectionHeader overline="Our Approach" title="Commerce as a vehicle for culture" />
            <p className="mt-5 text-ink-600 font-sans leading-relaxed">
              We don't just build a marketplace. We document practices, verify authenticity, amplify voices, and return profits to the communities that generate them.
            </p>
            <p className="mt-4 text-ink-600 font-sans leading-relaxed">
              Our four program pillars — Agriculture, Medicine, Technology, and Textile — map onto the four domains the Dibia tradition encompasses: sustenance, healing, knowledge, and craft.
            </p>
            <div className="mt-7 flex gap-3 flex-wrap">
              <Link href="/shop"><Button variant="primary" trailingIcon={<ArrowRight size={16} />}>Shop the Marketplace</Button></Link>
              <Link href="/projects"><Button variant="secondary">Support a Project</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
