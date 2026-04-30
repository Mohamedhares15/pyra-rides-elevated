import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Calendar, Clock, Shield, Award } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { StarRating } from "@/components/ui/star-rating";
import { HorseCard } from "@/components/cards/horse-card";
import { ReviewCard } from "@/components/cards/review-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/skeletons";
import { useStable, useStableHorses, useReviews } from "@/lib/api/hooks";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/stables/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Stable — PyraRides` },
      { name: "description", content: `Book a ride at one of Giza's most loved stables. Verified horses, real reviews, transparent pricing.` },
      { property: "og:title", content: `Stable — PyraRides` },
    ],
  }),
  component: StableDetailPage,
});

function StableDetailPage() {
  const { id } = Route.useParams();
  const { data: stable, isLoading } = useStable(id);
  const { data: horses } = useStableHorses(stable?.id);
  const { data: reviews } = useReviews({ stableId: stable?.id });

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="container-editorial py-16">
          <Skeleton className="h-[60vh] w-full" />
          <div className="mt-8 space-y-4 max-w-2xl">
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (!stable) throw notFound();

  return (
    <SiteLayout>
      {/* Gallery */}
      <section className="container-editorial pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[60vh] md:h-[70vh] min-h-[420px]">
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-sm bg-surface">
            <img src={stable.galleryUrls[0]} alt={stable.name} className="h-full w-full object-cover" />
          </div>
          {stable.galleryUrls.slice(1, 5).map((u, i) => (
            <div key={i} className="hidden md:block relative overflow-hidden rounded-sm bg-surface">
              <img src={u} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Header */}
      <section className="container-editorial pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[11px] tracking-luxury uppercase ink-muted inline-flex items-center gap-2">
                <MapPin className="h-3 w-3" /> {stable.location}
              </p>
              <h1 className="mt-3 font-display text-5xl md:text-7xl text-foreground leading-[1.02]">{stable.name}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm ink-soft">
                <span className="inline-flex items-center gap-2"><StarRating value={stable.rating} size="sm" /> {stable.rating.toFixed(1)} ({stable.reviewCount})</span>
                <span>·</span>
                <span>{stable.horseCount} horses</span>
                <span>·</span>
                <span>Est. {new Date().getFullYear() - stable.yearsOperating}</span>
                <span>·</span>
                <span>Owner: {stable.ownerName}</span>
              </div>
            </Reveal>

            {stable.announcementBanner && (
              <Reveal>
                <div className="mt-8 border-l-2 border-accent pl-5 py-2">
                  <p className="text-sm ink-soft italic">{stable.announcementBanner}</p>
                </div>
              </Reveal>
            )}

            <Reveal>
              <p className="mt-10 text-base md:text-lg ink-soft leading-relaxed max-w-2xl">{stable.description}</p>
            </Reveal>

            <Reveal>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { icon: Shield, label: "Verified", value: "PyraRides certified" },
                  { icon: Clock, label: "Lead time", value: `${stable.minLeadTimeHours}h minimum` },
                  { icon: Award, label: "Experience", value: `${stable.yearsOperating} years` },
                ].map((s) => (
                  <div key={s.label} className="border-t hairline pt-4">
                    <s.icon className="h-4 w-4 ink-muted" />
                    <p className="mt-3 text-[10px] tracking-luxury uppercase ink-muted">{s.label}</p>
                    <p className="mt-1 text-sm text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12">
                <h3 className="text-[11px] tracking-luxury uppercase ink-muted">Amenities</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {stable.amenities.map((a) => (
                    <li key={a} className="text-xs px-3 py-1.5 rounded-sm border hairline ink-soft">{a}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Booking CTA */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 surface-elevated border hairline rounded-sm p-6 shadow-soft">
              <p className="text-[11px] tracking-luxury uppercase ink-muted">From</p>
              <p className="mt-2 font-display text-4xl text-foreground">
                {formatPrice(stable.startingPricePerHour)} <span className="text-sm ink-muted">/hour</span>
              </p>
              <Button asChild size="lg" className="mt-6 w-full rounded-sm">
                <Link to="/booking" search={{ stableId: stable.id }}>
                  <Calendar className="mr-2 h-4 w-4" /> Book a ride
                </Link>
              </Button>
              <p className="mt-4 text-xs ink-muted text-center">
                Free cancellation up to {stable.minLeadTimeHours} hours before.
              </p>
              <div className="mt-6 pt-6 border-t hairline">
                <p className="text-xs ink-muted">{stable.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horses */}
      {horses && horses.length > 0 && (
        <section className="container-editorial py-16 md:py-24 border-t hairline">
          <Reveal>
            <p className="text-[11px] tracking-luxury uppercase ink-muted">Meet the horses</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">The string at {stable.name}.</h2>
          </Reveal>
          <StaggerGroup className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {horses.map((h) => (
              <StaggerItem key={h.id}><HorseCard horse={h} /></StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      {/* Reviews */}
      {reviews && reviews.length > 0 && (
        <section className="container-editorial py-16 md:py-24 border-t hairline">
          <Reveal>
            <p className="text-[11px] tracking-luxury uppercase ink-muted">From riders</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">What people say.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
