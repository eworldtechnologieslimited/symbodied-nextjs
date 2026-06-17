import { Leaf } from "lucide-react";

const PAIRS: [string, string][] = [
  ["#1A6B3C", "#2E9B5A"],
  ["#2E9B5A", "#8FCFA9"],
  ["#0F3D22", "#1A6B3C"],
  ["#C99A0C", "#F5C518"],
  ["#1A6B3C", "#0F3D22"],
  ["#2E9B5A", "#1A6B3C"],
];

interface PhotoProps {
  seed?: number;
  label?: string;
  className?: string;
}

export function PhotoPlaceholder({ seed = 0, label, className }: PhotoProps) {
  const [a, b] = PAIRS[seed % PAIRS.length];
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #fff 0, transparent 40%), radial-gradient(circle at 80% 70%, #fff 0, transparent 35%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-1.5 text-white/80">
        <Leaf size={26} />
        {label && <span className="text-xs font-semibold tracking-wide font-sans">{label}</span>}
      </div>
    </div>
  );
}
