import { Link } from "@tanstack/react-router";
import type { Horse } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const TIER_LABEL: Record<Horse["adminTier"], string> = {
  novice: "Novice",
  intermediate: "Intermediate",
  advanced: "Advanced",
  master: "Master",
};

export function HorseCard({ horse }: { horse: Horse }) {
  const finalPrice = horse.discountPercent
    ? Math.round(horse.pricePerHour * (1 - horse.discountPercent / 100))
    : horse.pricePerHour;

  return (
    <Link
      to="/booking"
      search={{ stableId: horse.stableId, horseId: horse.id }}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-surface">
        <img
          src={horse.imageUrls[0]}
          alt={horse.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        {horse.discountPercent && (
          <span className="absolute top-3 left-3 text-[10px] tracking-luxury uppercase px-2 py-1 rounded-sm bg-accent text-accent-foreground">
            -{horse.discountPercent}%
          </span>
        )}
        <span className={cn(
          "absolute bottom-3 left-3 text-[10px] tracking-luxury uppercase px-2 py-1 rounded-sm bg-background/90 backdrop-blur ink-soft",
        )}>
          {TIER_LABEL[horse.adminTier]}
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h4 className="font-display text-lg text-foreground">{horse.name}</h4>
        <span className="text-sm tabular-nums">
          {horse.discountPercent && (
            <span className="ink-muted line-through mr-1.5 text-xs">{formatPrice(horse.pricePerHour)}</span>
          )}
          {formatPrice(finalPrice)}
          <span className="ink-muted">/hr</span>
        </span>
      </div>
      <p className="text-xs ink-muted">
        {horse.stableName} · {horse.breed} · {horse.age}y
      </p>
    </Link>
  );
}
