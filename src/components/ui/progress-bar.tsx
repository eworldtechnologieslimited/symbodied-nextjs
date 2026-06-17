import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  color?: "brand" | "gold" | "success" | "error";
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

const colorStyles = {
  brand: "bg-brand",
  gold: "bg-gold",
  success: "bg-success-green",
  error: "bg-error",
};

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2",
};

export function ProgressBar({ value, color = "brand", size = "md", showLabel = false, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full rounded-full bg-ink-200 overflow-hidden", sizeStyles[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", colorStyles[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex justify-between text-xs text-ink-500 font-sans">
          <span>{clamped}% funded</span>
        </div>
      )}
    </div>
  );
}
