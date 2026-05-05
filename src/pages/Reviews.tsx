import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Stars } from "@/components/reviews/Stars";
import { ReviewCard, type Review } from "@/components/reviews/ReviewCard";
import { ReviewModal } from "@/components/reviews/ReviewModal";
import { SAMPLE_REVIEWS } from "@/components/reviews/RatingsSection";
import { Reveal, StaggerGroup, StaggerItem, easeLuxury } from "@/components/shared/Motion";
import { stables } from "@/data/mock";
import { cn } from "@/lib/utils";

type ReviewWithStable = Review & { stableId: string; stableName: string };

const ALL_REVIEWS: ReviewWithStable[] = [
  { ...SAMPLE_REVIEWS[0], stableId: "al-nasr", stableName: "Al-Nasr Heritage Stables" },
  { ...SAMPLE_REVIEWS[1], stableId: "saqqara", stableName: "Saqqara Royal Equestrian" },
  { ...SAMPLE_REVIEWS[2], stableId: "house-of-horus", stableName: "House of Horus" },
  { id: "r4", author: "Sebastián Castellanos", location: "Madrid, Spain", date: "March 2026", rating: 5, title: "A standard-setter", body: "We have stayed at most luxury equestrian houses worldwide. PyraRides set a new bar — the discretion, the horses, the silence.", verified: true, stableId: "al-nasr", stableName: "Al-Nasr Heritage Stables" },
  { id: "r5", author: "Ingrid Lindqvist", location: "Stockholm, Sweden", date: "February 2026", rating: 4, title: "Quietly remarkable", body: "Bastet was patient with my limited dressage. The house arranged everything without ever appearing to.", packageName: "Twilight at Khufu", verified: true, stableId: "saqqara", stableName: "Saqqara Royal Equestrian" },
  { id: "r6", author: "Hassan Al-Rashid", location: "Dubai, UAE", date: "February 2026", rating: 5, title: "The desert hour", body: "We took the Horus Initiation. Two days that will reshape how my family travels.", packageName: "The Horus Initiation", verified: true, stableId: "house-of-horus", stableName: "House of Horus" },
  { id: "r7", author: "Sofia Marchetti", location: "Milan, Italy", date: "January 2026", rating: 4, title: "An unhurried morning", body: "Sirocco was the right horse for me. Tea after the ride was a small ceremony I will remember.", verified: true, stableId: "al-nasr", stableName: "Al-Nasr Heritage Stables" },
  { id: "r8", author: "Dmitri Volkov", location: "London, UK", date: "January 2026", rating: 5, title: "Worth the journey", body: "The astronomer at the desert dinner was a quiet revelation. The horses, faultless.", packageName: "Pharaoh's Banquet", verified: true, stableId: "saqqara", stableName: "Saqqara Royal Equestrian" },
];

const RATINGS = [0, 5, 4, 3] as const;

const Reviews = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [stableId, setStableId] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);

  const reviews = useMemo(() => {
    return ALL_REVIEWS.filter((r) => {
      const q = !query || r.body.toLowerCase().includes(query.toLowerCase()) || r.author.toLowerCase().includes(query.toLowerCase()) || r.title.toLowerCase().includes(query.toLowerCase());
      const s = stableId === "all" || r.stableId === stableId;
      const m = !minRating || r.rating >= minRating;
      return q && s && m;
    });
  }, [query, stableId, minRating]);

  const avg = ALL_REVIEWS.reduce((a, b) => a + b.rating, 0) / ALL_REVIEWS.length;
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ALL_REVIEWS.filter((r) => Math.round(r.rating) === star).length,
  }));
  const max = Math.max(...dist.map((d) => d.count), 1);

  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="container py-16 md:py-24 border-b hairline">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-4">Letters from the Plateau</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl text-balance">
            What guests have written, in their own hand.
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft text-pretty">
            We do not collect testimonials. We receive letters. Each one a private record of an hour at Giza.
          </p>
        </Reveal>
      </section>

      {/* Summary + distribution */}
      <section className="container py-20 md:py-28 border-b hairline grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-4">The register</p>
          <p className="font-display text-8xl leading-none">{avg.toFixed(1)}</p>
          <div className="mt-4"><Stars value={avg} size="md" /></div>
          <p className="mt-3 text-sm text-ink-soft">Across {ALL_REVIEWS.length} verified letters · {stables.length} stables</p>
          <button
            onClick={() => setOpen(true)}
            className="mt-10 inline-flex items-center px-6 py-3 bg-foreground text-background text-[11px] tracking-[0.18em] uppercase"
          >
            Write a letter
          </button>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-6">Distribution</p>
          <ul className="space-y-4">
            {dist.map((d) => (
              <li key={d.star} className="flex items-center gap-4 text-sm">
                <span className="w-12 tabular-nums text-ink-muted text-[10px] tracking-luxury uppercase">{d.star} star</span>
                <div className="flex-1 h-px bg-hairline relative overflow-hidden">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: d.count / max }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: easeLuxury }}
                    style={{ transformOrigin: "left" }}
                    className="absolute inset-0 bg-foreground"
                  />
                </div>
                <span className="w-8 text-right tabular-nums text-ink-muted">{d.count}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Sticky filters */}
      <div className="sticky top-20 z-20 bg-background/80 backdrop-blur border-b hairline">
        <div className="container py-5 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 flex-1 min-w-[220px] border-b hairline pb-2">
            <Search className="size-3.5 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a letter…"
              className="flex-1 bg-transparent text-sm font-display focus:outline-none placeholder:text-ink-muted"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setStableId("all")}
              className={cn(
                "text-[10px] tracking-luxury uppercase px-3 py-2 border hairline transition-colors",
                stableId === "all" ? "bg-foreground text-background border-foreground" : "hover:bg-surface/40",
              )}
            >
              All houses
            </button>
            {stables.map((s) => (
              <button
                key={s.id}
                onClick={() => setStableId(s.id)}
                className={cn(
                  "text-[10px] tracking-luxury uppercase px-3 py-2 border hairline transition-colors",
                  stableId === s.id ? "bg-foreground text-background border-foreground" : "hover:bg-surface/40",
                )}
              >
                {s.name.split(" ")[0]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {RATINGS.map((r) => (
              <button
                key={r}
                onClick={() => setMinRating(r)}
                className={cn(
                  "text-[10px] tracking-luxury uppercase px-3 py-2 border hairline transition-colors",
                  minRating === r ? "bg-foreground text-background border-foreground" : "hover:bg-surface/40",
                )}
              >
                {r === 0 ? "Any rating" : `${r}+ stars`}
              </button>
            ))}
          </div>
          <p className="text-[10px] tracking-luxury uppercase text-ink-muted">{reviews.length} letters</p>
        </div>
      </div>

      {/* Letters */}
      <section className="container py-16 md:py-24">
        {reviews.length === 0 ? (
          <div className="border hairline py-24 text-center">
            <p className="text-[11px] tracking-luxury uppercase text-ink-muted">No letters match these filters</p>
            <button
              onClick={() => { setQuery(""); setStableId("all"); setMinRating(0); }}
              className="mt-4 text-sm font-display border-b hairline pb-1 hover:border-foreground"
            >
              Reset the filters
            </button>
          </div>
        ) : (
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" gap={0.06}>
            {reviews.map((r) => (
              <StaggerItem key={r.id}>
                <div className="h-full flex flex-col">
                  <p className="text-[10px] tracking-luxury uppercase text-ink-muted mb-2">{r.stableName}</p>
                  <ReviewCard review={r} />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      <ReviewModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Reviews;
