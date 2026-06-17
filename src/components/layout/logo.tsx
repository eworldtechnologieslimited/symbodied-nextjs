import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  inverse?: boolean;
  height?: number;
  className?: string;
}

export function Logo({ inverse = false, height = 36, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Containerized mark — green-tinted circle wrapping the actual logo PNG */}
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-full"
        style={{
          width: height,
          height: height,
          background: inverse ? "rgba(255,255,255,0.18)" : "#E8F5EE",
          padding: Math.round(height * 0.1),
        }}
      >
        <Image
          src="/images/logo.png"
          alt="Symbodied logo mark"
          width={height - Math.round(height * 0.2)}
          height={height - Math.round(height * 0.2)}
          className="object-contain"
          priority
        />
      </span>

      {/* Wordmark */}
      <span
        className="font-display font-bold tracking-tight select-none"
        style={{
          fontSize: Math.round(height * 0.6),
          lineHeight: 1,
          color: inverse ? "#FFFFFF" : "#0F1A14",
        }}
      >
        Symbodied
      </span>
    </span>
  );
}
