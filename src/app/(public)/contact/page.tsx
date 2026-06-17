"use client";

import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Message sent! We'll get back to you within 48 hours.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div>
      <section className="bg-brand-light border-b border-ink-200">
        <div className="max-w-[var(--container-max)] mx-auto px-6 py-14">
          <Badge tone="brand" className="mb-4">Get in Touch</Badge>
          <h1 className="font-display font-bold text-4xl text-ink tracking-tight">Contact Us</h1>
          <p className="mt-2 text-ink-600 font-sans text-base max-w-lg">
            Questions about the marketplace, vendor onboarding, partnerships, or anything else — we're here.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 grid md:grid-cols-[1fr_1.5fr] gap-14">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-sans font-bold text-xl text-ink mb-5">Ways to reach us</h2>
              <div className="flex flex-col gap-5">
                {[
                  { icon: <Mail size={18} />, label: "Email", content: <a href="mailto:hello@symbodied.com" className="text-sm text-brand hover:underline font-sans">hello@symbodied.com</a> },
                  { icon: <Phone size={18} />, label: "Phone", content: <a href="tel:+2348000000000" className="text-sm text-ink-600 font-sans">+234 800 000 0000</a> },
                  { icon: <MapPin size={18} />, label: "Office", content: <p className="text-sm text-ink-600 font-sans">14 Commerce Road, Victoria Island<br />Lagos, Nigeria</p> },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-brand-light text-brand">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-sm text-ink font-sans">{item.label}</div>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-ink-100 rounded-xl p-6">
              <h3 className="font-sans font-bold text-sm text-ink mb-2">Vendor enquiries</h3>
              <p className="text-sm text-ink-600 font-sans leading-relaxed">
                Interested in selling on Symbodied? Email <a href="mailto:vendors@symbodied.com" className="text-brand hover:underline">vendors@symbodied.com</a>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="First name" type="text" placeholder="Ada" required />
              <Input label="Last name" type="text" placeholder="Obi" required />
            </div>
            <Input label="Email address" type="email" placeholder="you@example.com" required leadingIcon={<Mail size={16} />} />
            <Input label="Subject" type="text" placeholder="How can we help?" required />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-ink font-sans">Message</label>
              <textarea required rows={5} placeholder="Tell us more..." className="w-full rounded-lg border border-ink-200 px-4 py-3 text-sm font-sans text-ink placeholder:text-ink-400 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none transition-colors" />
            </div>
            <Button type="submit" variant="primary" size="lg" loading={loading}>Send Message</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
