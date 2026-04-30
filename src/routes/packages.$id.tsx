import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Users, Check, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/skeletons";
import { usePackage } from "@/lib/api/hooks";
import { formatPrice, formatDuration } from "@/lib/format";

export const Route = createFileRoute("/packages/$id")({
  head: () => ({
    meta: [
      { title: "Package — PyraRides" },
      { name: "description", content: "A curated riding experience at the pyramids." },
    ],
  }),
  component: PackageDetailPage,
});

function PackageDetailPage() {
  const { id } = Route.useParams();
  const { data: pkg, isLoading } = usePackage(id);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="container-editorial py-16 space-y-6">
          <Skeleton className="h-[50vh] w-full" />
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </SiteLayout>
    );
  }

  if (!pkg) throw notFound();

  return (
    <SiteLayout>
      <section className="container-editorial pt-8">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm bg-surface">
          <img src={pkg.imageUrl} alt={pkg.title} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="container-editorial pt-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="text-[11px] tracking-luxury uppercase ink-muted">
              {pkg.packageType === "PRIVATE_VIP" ? "Private · VIP" : "Group event"} · {pkg.stableName}
            </p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl text-foreground leading-[1.02]">{pkg.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm ink-soft">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {formatDuration(pkg.duration)}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> Up to {pkg.maxPeople}</span>
            </div>
            <p className="mt-8 text-base md:text-lg ink-soft leading-relaxed max-w-2xl">{pkg.longDescription}</p>
          </Reveal>

          <Reveal>
            <div className="mt-14">
              <h3 className="text-[11px] tracking-luxury uppercase ink-muted">Highlights</h3>
              <ul className="mt-5 space-y-3">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm ink-soft">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14">
              <h3 className="text-[11px] tracking-luxury uppercase ink-muted">Itinerary</h3>
              <ol className="mt-6 space-y-6">
                {pkg.itinerary.map((step, i) => (
                  <li key={i} className="grid grid-cols-[80px_1fr] gap-6">
                    <span className="font-display text-lg ink-soft tabular-nums">{step.time}</span>
                    <div className="border-l hairline pl-6 pb-2">
                      <p className="font-display text-xl text-foreground">{step.title}</p>
                      <p className="mt-1 text-sm ink-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14">
              <h3 className="text-[11px] tracking-luxury uppercase ink-muted">Inclusions</h3>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.inclusions.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm ink-soft">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 surface-elevated border hairline rounded-sm p-6 shadow-soft">
            {pkg.originalPrice && (
              <p className="text-sm ink-muted line-through tabular-nums">{formatPrice(pkg.originalPrice)}</p>
            )}
            <p className="font-display text-4xl text-foreground tabular-nums">{formatPrice(pkg.price)}</p>
            <p className="text-xs ink-muted">per booking · up to {pkg.maxPeople} people</p>
            <Button asChild size="lg" className="mt-6 w-full rounded-sm">
              <Link to="/checkout/package/$id" params={{ id: pkg.id }}>
                Book this package <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-xs ink-muted text-center">Free cancellation up to 48 hours before.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
