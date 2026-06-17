import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaTone?: "default" | "error";
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, delta, deltaTone = "default", icon, className }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink-600 font-sans">{label}</span>
        {icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-light text-brand">
            {icon}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-display font-bold text-2xl text-ink leading-none">{value}</span>
        {delta && (
          <span className={cn("text-xs font-sans", deltaTone === "error" ? "text-error" : "text-ink-500")}>
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
