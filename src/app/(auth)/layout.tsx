import Image from "next/image";
import { Logo } from "@/components/layout/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden md:flex flex-col justify-between relative bg-brand overflow-hidden p-12">
        <Image
          src="/images/static/african_girl.png"
          alt="Symbodied community"
          fill
          className="object-cover opacity-20"
          sizes="50vw"
          priority
        />
        <div className="relative z-10">
          <Link href="/">
            <Logo inverse height={32} />
          </Link>
        </div>
        <div className="relative z-10 max-w-sm">
          <blockquote className="font-display font-bold text-3xl text-white leading-tight mb-4">
            "When tradition and trade move together, whole communities rise."
          </blockquote>
          <p className="text-white/70 text-sm font-sans leading-relaxed">
            Join thousands of vendors, creators, and community supporters across Africa and the diaspora.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <span className="text-white/50 text-xs font-sans">© 2026 Symbodied LLC</span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center items-center px-6 py-12 bg-ink-100">
        <div className="md:hidden mb-8">
          <Link href="/">
            <Logo height={32} />
          </Link>
        </div>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
