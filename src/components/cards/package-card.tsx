import { Link } from "@tanstack/react-router";
import { Clock, Users } from "lucide-react";
import type { Package } from "@/lib/types";
import { formatPrice, formatDuration } from "@/lib/format";

export function PackageCard({ pkg, layout = "vertical" }: { pkg: Package; layout?: "vertical" | "horizontal" }) {
  if (layout === "horizontal") {
    return (
      <Link to="/packages/$id" params={{ id: pkg.slug }} className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
          <img src={pkg.imageUrl} alt={pkg.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]" />
        </div>
        <div>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">
            {pkg.packageType === "PRIVATE_VIP" ? "Private · VIP" : "Group event"}
          </p>
          <h3 className="mt-2 font-display text-3xl md:text-4xl text-foreground">{pkg.title}</h3>
          <p className="mt-3 text-sm ink-soft leading-relaxed">{pkg.description}</p>
          <div className="mt-5 flex items-center gap-5 text-xs ink-muted">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{formatDuration(pkg.duration)}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />Up to {pkg.maxPeople}</span>
            <span>{pkg.stableName}</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            {pkg.originalPrice && <span className="text-sm ink-muted line-through tabular-nums">{formatPrice(pkg.originalPrice)}</span>}
            <span className="font-display text-2xl tabular-nums">{formatPrice(pkg.price)}</span>
            <span className="text-xs ink-muted">per booking</span>
          </div>
          <span className="mt-6 inline-block text-[11px] tracking-luxury uppercase border-b hairline pb-1">View package</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/packages/$id" params={{ id: pkg.slug }} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-surface">
        <img src={pkg.imageUrl} alt={pkg.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]" />
        {pkg.originalPrice && (
          <span className="absolute top-3 left-3 text-[10px] tracking-luxury uppercase px-2 py-1 rounded-sm bg-accent text-accent-foreground">
            Save {formatPrice(pkg.originalPrice - pkg.price)}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-[10px] tracking-luxury uppercase ink-muted">
          {pkg.packageType === "PRIVATE_VIP" ? "Private · VIP" : "Group event"}
        </p>
        <h3 className="mt-2 font-display text-2xl text-foreground group-hover:text-foreground/80 transition-colors">
          {pkg.title}
        </h3>
        <p className="mt-2 text-sm ink-muted line-clamp-2">{pkg.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs ink-muted">
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatDuration(pkg.duration)}</span>
            <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{pkg.maxPeople}</span>
          </div>
          <span className="text-sm tabular-nums">{formatPrice(pkg.price)}</span>
        </div>
      </div>
    </Link>
  );
}
