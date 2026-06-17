import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtext?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ overline, title, subtext, align = "left", action, className }: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={cn("flex flex-col gap-2", isCenter && "items-center text-center", !isCenter && "md:flex-row md:items-end md:justify-between", className)}>
      <div className={cn("flex flex-col gap-2", isCenter && "items-center")}>
        {overline && (
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-brand font-sans">
            {overline}
          </span>
        )}
        <h2 className="font-display font-bold text-2xl md:text-3xl text-ink leading-tight tracking-tight">
          {title}
        </h2>
        {subtext && (
          <p className="text-ink-600 font-sans text-base leading-relaxed max-w-xl">
            {subtext}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
