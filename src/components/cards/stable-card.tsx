import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { Stable } from "@/lib/types";
import { StarRating } from "@/components/ui/star-rating";
import { formatPrice } from "@/lib/format";

export function StableCard({ stable }: { stable: Stable }) {
  return (
    <Link
      to="/stables/$id"
      params={{ id: stable.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
        <img
          src={stable.imageUrl}
          alt={stable.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-sm bg-background/90 backdrop-blur ink-soft">
            <MapPin className="h-3 w-3" />
            {stable.location}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-sm bg-background/90 backdrop-blur">
            <StarRating value={stable.rating} size="sm" />
            <span className="tabular-nums">{stable.rating.toFixed(1)}</span>
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl text-foreground group-hover:text-foreground/80 transition-colors">
          {stable.name}
        </h3>
        <span className="text-xs ink-muted whitespace-nowrap">
          from <span className="text-foreground tabular-nums">{formatPrice(stable.startingPricePerHour)}</span>/hr
        </span>
      </div>
      <p className="mt-1 text-xs ink-muted">
        {stable.horseCount} horses · {stable.reviewCount} reviews · est. {new Date().getFullYear() - stable.yearsOperating}
      </p>
    </Link>
  );
}
