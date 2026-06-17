import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/commerce/section-header";

const WAYS = [
  { icon: <Globe size={22} />, title: "Fund a Project", desc: "Directly back community-led projects raising money on Symbodied. Your contribution finances real infrastructure." },
  { icon: <Heart size={22} />, title: "Buy with Purpose", desc: "Every purchase from a Symbodied vendor puts money into community hands. No middlemen, no extraction." },
  { icon: <Users size={22} />, title: "Mentor & Advise", desc: "Offer your expertise — legal, financial, technical — to vendors building their businesses." },
];

export default function SolidarityPage() {
  return (
    <div>
      {/* Hero */}
      <section className="grid md:grid-cols-2">
        <div className="bg-brand flex items-center order-2 md:order-1">
          <div className="px-14 py-20 max-w-[520px] mx-auto md:mr-0">
            <Badge tone="gold" className="mb-5">International Solidarity</Badge>
            <h1 className="font-display font-bold text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-white mb-5">
              The diaspora has always been part of the story
            </h1>
            <p className="text-white/80 font-sans text-lg leading-relaxed">
              Symbodied exists at the intersection of homeland and diaspora — a bridge for capital, knowledge, and love to flow back.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link href="/projects"><Button variant="gold" size="lg">Fund a Project</Button></Link>
              <Link href="/shop"><Button variant="secondary" size="lg">Shop Now</Button></Link>
            </div>
          </div>
        </div>
        <div className="relative min-h-[480px] order-1 md:order-2">
          <Image src="/images/static/international_security.png" alt="International solidarity" fill className="object-cover" sizes="50vw" />
        </div>
      </section>

      {/* Ways to support */}
      <section className="py-20 bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <SectionHeader align="center" overline="How you can help" title="Ways to Show Solidarity" className="mb-10" />
          <div className="grid md:grid-cols-3 gap-6">
            {WAYS.map((w) => (
              <Card key={w.title} padding="lg" className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand mx-auto mb-4">
                  {w.icon}
                </span>
                <h3 className="font-sans font-bold text-lg text-ink mb-2">{w.title}</h3>
                <p className="text-sm text-ink-600 font-sans leading-relaxed">{w.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <div className="bg-ink">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "42", l: "Countries with supporters" },
            { v: "₦50M+", l: "Donated to date" },
            { v: "1,200+", l: "Diaspora supporters" },
            { v: "25+", l: "Communities reached" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display font-bold text-4xl text-gold leading-none">{s.v}</div>
              <div className="mt-1.5 text-sm text-white/60 font-sans">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-[var(--container-max)] mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-ink mb-4">Ready to get involved?</h2>
          <p className="text-ink-600 font-sans mb-7 max-w-md mx-auto">Create a free account to start shopping, donating, or mentoring today.</p>
          <Link href="/signup">
            <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>Join Symbodied</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
