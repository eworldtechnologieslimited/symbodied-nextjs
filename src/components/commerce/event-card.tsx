import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";
import { PhotoPlaceholder } from "./photo-placeholder";

interface EventCardProps {
  day: string;
  month: string;
  theme: string;
  name: string;
  venue: string;
  location: string;
  slotsLeft: number;
  image?: string;
  seed?: number;
  onRSVP?: () => void;
  rsvpButton?: React.ReactNode;
}

export function EventCard({ day, month, theme, name, venue, location, slotsLeft, image, seed = 0, onRSVP, rsvpButton }: EventCardProps) {
  const place = [venue, location].filter(Boolean).join(", ");

  return (
    <div className="rounded-xl border border-ink-200 dark:border-[#263a2b] bg-white dark:bg-[#162018] shadow-[var(--shadow-sm)] overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5">
      <div className="relative aspect-[16/9] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <PhotoPlaceholder seed={seed} label={theme} />
        )}
        <div className="absolute bottom-3 left-3 flex flex-col items-center bg-black/55 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <span className="font-display font-bold text-xl leading-none text-white">{day}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white/70">{month}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2">
        <Badge tone="neutral" size="sm" className="self-start">{theme}</Badge>
        <h3 className="font-sans font-bold text-base text-ink dark:text-[#dceee3] leading-snug line-clamp-1">{name}</h3>
        {place && (
          <p className="flex items-center gap-1 text-xs text-ink-500 dark:text-[#668074] font-sans">
            <MapPin size={11} className="flex-shrink-0" />{place}
          </p>
        )}
        <div className="flex items-center justify-between mt-1">
          <span className="flex items-center gap-1 text-xs text-ink-500 dark:text-[#668074] font-sans">
            <Users size={11} />{slotsLeft} slots left
          </span>
          {rsvpButton ?? <Button variant="primary" size="sm" onClick={onRSVP}>RSVP</Button>}
        </div>
      </div>
    </div>
  );
}
