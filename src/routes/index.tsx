import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Calendar, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal, StaggerGroup, StaggerItem, FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { PackageCard } from "@/components/cards/package-card";
import { PackageCardSkeleton } from "@/components/skeletons";
import { usePackages, useLocations } from "@/lib/api/hooks";
import { HERO_IMAGE } from "@/lib/mock-data/seed";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PyraRides — Ride at the Pyramids" },
      {
        name: "description",
        content: "Book a horse and ride past the Great Pyramids of Giza and Saqqara. Eight verified stables, two hundred horses, one unforgettable plateau.",
      },
      { property: "og:title", content: "PyraRides — Ride at the Pyramids" },
      { property: "og:description", content: "Egypt's first marketplace for booking horse riding experiences at the Pyramids." },
      { property: "og:image", content: HERO_IMAGE },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout transparentNav>
      <Hero />
      <HowItWorks />
      <FeaturedPackages />
      <SocialProof />
      <FinalCTA />
    </SiteLayout>
  );
}

function Hero() {
  const { data: locations } = useLocations();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const searchHref = `/stables?${new URLSearchParams({
    ...(location && { location }),
    ...(date && { date }),
  }).toString()}`;

  return (
    <section className="relative min-h-[100svh] flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="A rider on horseback before the Great Pyramid of Giza at sunrise"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-background" />
      </div>

      <div className="container-editorial flex-1 flex flex-col justify-end pb-16 md:pb-24 pt-32 md:pt-40">
        <FadeIn>
          <p className="text-[11px] tracking-luxury uppercase text-background/90">
            Giza · Saqqara · Since 2024
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] text-background max-w-5xl">
            Ride past the
            <br />
            pyramids at dawn.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-xl text-base md:text-lg text-background/85 leading-relaxed">
            Egypt's first online marketplace for booking horse riding experiences at the
            Giza and Saqqara Pyramids. Verified stables, trained horses, modern booking.
          </p>
        </FadeIn>

        {/* Search bar */}
        <FadeIn delay={0.35}>
          <form
            action={searchHref}
            className="mt-10 max-w-3xl bg-background/95 backdrop-blur-md rounded-sm shadow-lift overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] divide-y md:divide-y-0 md:divide-x divide-hairline">
              <label className="block px-5 py-4">
                <span className="block text-[10px] tracking-luxury uppercase ink-muted">Location</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 w-full bg-transparent text-base text-foreground outline-none"
                >
                  <option value="">Anywhere on the plateau</option>
                  {locations?.map((l) => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </label>
              <label className="block px-5 py-4">
                <span className="block text-[10px] tracking-luxury uppercase ink-muted">Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full bg-transparent text-base text-foreground outline-none"
                />
              </label>
              <div className="p-3">
                <Button asChild className="w-full md:w-auto h-full md:h-auto md:px-7 rounded-sm">
                  <Link to="/stables" search={{ location: location || undefined, date: date || undefined }}>
                    <Search className="mr-2 h-4 w-4" /> Find a ride
                  </Link>
                </Button>
              </div>
            </div>
          </form>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-background/80">
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Eight verified stables
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Two hundred trained horses
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Free cancellation up to 24h
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Choose your stable.",
    body: "Browse eight verified stables across the Giza and Saqqara plateaus. Read real reviews, see real horses, compare prices.",
    icon: Search,
  },
  {
    n: "02",
    title: "Pick your horse, your hour.",
    body: "Select a horse matched to your level. Choose a sunrise, sunset, or daytime slot. Bring up to five companions.",
    icon: Calendar,
  },
  {
    n: "03",
    title: "Ride into the desert.",
    body: "Arrive, mount, ride. Your guide knows the route. Your photographer is ready. Tea is waiting on return.",
    icon: Sparkles,
  },
];

function HowItWorks() {
  return (
    <section className="container-editorial py-24 md:py-36">
      <Reveal>
        <p className="text-[11px] tracking-luxury uppercase ink-muted">How it works</p>
        <h2 className="mt-4 font-display text-4xl md:text-6xl max-w-3xl text-foreground leading-[1.05]">
          Booking a ride at the pyramids, the way it should have always been.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
        {STEPS.map((step) => (
          <StaggerItem key={step.n}>
            <div>
              <div className="flex items-center gap-4">
                <span className="font-display text-3xl text-accent">{step.n}</span>
                <span className="h-px flex-1 bg-hairline" />
              </div>
              <h3 className="mt-6 font-display text-2xl md:text-3xl text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm ink-muted leading-relaxed max-w-sm">{step.body}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function FeaturedPackages() {
  const { data: packages, isLoading } = usePackages({ featured: true });

  return (
    <section className="surface py-24 md:py-36">
      <div className="container-editorial">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <Reveal>
            <p className="text-[11px] tracking-luxury uppercase ink-muted">Curated packages</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl max-w-2xl text-foreground leading-[1.05]">
              Experiences, not transactions.
            </h2>
          </Reveal>
          <Reveal>
            <Link to="/packages" className="text-[11px] tracking-luxury uppercase ink-soft border-b hairline pb-1 inline-flex items-center gap-2">
              View all packages <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <PackageCardSkeleton key={i} />)
            : packages?.slice(0, 3).map((pkg) => (
                <Reveal key={pkg.id}>
                  <PackageCard pkg={pkg} />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="container-editorial py-24 md:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-luxury uppercase ink-muted">The plateau, digitised.</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-foreground leading-[1.05]">
            For sixty years, the only way to ride here was to know someone.
          </h2>
          <p className="mt-6 text-base ink-soft leading-relaxed">
            We changed that. PyraRides is the first platform to bring every reputable
            stable on the Giza and Saqqara plateaus into one place — with verified
            horses, transparent pricing, and bookings you can trust.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="rounded-sm">
              <Link to="/about">Read our story <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-px bg-hairline border hairline">
            {[
              { n: "8", l: "Verified stables" },
              { n: "200+", l: "Trained horses" },
              { n: "12,000+", l: "Rides completed" },
              { n: "4.8★", l: "Average rating" },
            ].map((stat) => (
              <div key={stat.l} className="bg-background p-8 md:p-12">
                <p className="font-display text-5xl md:text-6xl text-foreground">{stat.n}</p>
                <p className="mt-3 text-[11px] tracking-luxury uppercase ink-muted">{stat.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container-editorial pb-24 md:pb-36">
      <div className="relative overflow-hidden rounded-sm bg-primary text-primary-foreground py-20 md:py-32 px-8 md:px-16">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-luxury uppercase text-primary-foreground/70">Begin</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05]">
            The plateau is waiting.
          </h2>
          <p className="mt-6 text-base text-primary-foreground/85 leading-relaxed max-w-xl">
            Choose your stable. Pick your horse. Ride past the pyramids. We've made the
            booking the easy part.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-sm bg-background text-foreground hover:bg-background/90">
              <Link to="/stables">Browse stables</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/packages">See packages</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
