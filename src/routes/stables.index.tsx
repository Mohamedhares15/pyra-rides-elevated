import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/site-layout";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { StableCard } from "@/components/cards/stable-card";
import { HorseCard } from "@/components/cards/horse-card";
import { StableCardSkeleton, HorseCardSkeleton } from "@/components/skeletons";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStables, useHorses, useLocations } from "@/lib/api/hooks";
import type { HorseColor } from "@/lib/types";

const searchSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  minRating: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  color: z.string().optional(),
  sort: z.enum(["recommended", "price-asc", "price-desc", "highest-rated", "newest"]).optional(),
  view: z.enum(["stables", "horses"]).optional(),
});

export const Route = createFileRoute("/stables/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Stables — PyraRides" },
      { name: "description", content: "Browse eight verified stables across the Giza and Saqqara plateaus. Real horses, real reviews, real prices." },
      { property: "og:title", content: "Stables — PyraRides" },
      { property: "og:description", content: "Eight verified stables, two hundred horses, one plateau." },
    ],
  }),
  component: StablesPage,
});

const HORSE_COLORS: { value: HorseColor; label: string }[] = [
  { value: "bay", label: "Bay" }, { value: "chestnut", label: "Chestnut" },
  { value: "black", label: "Black" }, { value: "grey", label: "Grey" },
  { value: "white", label: "White" }, { value: "palomino", label: "Palomino" },
];

function StablesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const view = search.view ?? (search.color || search.minPrice || search.maxPrice ? "horses" : "stables");

  const filters = useMemo(() => ({
    search: search.search,
    location: search.location,
    minRating: search.minRating,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    color: search.color as HorseColor | undefined,
    sort: search.sort,
  }), [search]);

  const stablesQ = useStables(filters);
  const horsesQ = useHorses(filters);
  const { data: locations } = useLocations();

  const update = (next: Partial<typeof search>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }) });

  return (
    <SiteLayout>
      <section className="border-b hairline">
        <div className="container-editorial py-12 md:py-16">
          <Reveal>
            <p className="text-[11px] tracking-luxury uppercase ink-muted">Marketplace</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl text-foreground leading-[1.02]">
              Find your stable.
            </h1>
            <p className="mt-4 max-w-xl text-base ink-soft">
              Eight verified stables across Giza and Saqqara. Filter by location, price, or
              horse — switch views to browse individual horses across all stables.
            </p>
          </Reveal>

          {/* Search bar */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 ink-muted pointer-events-none" />
              <Input
                placeholder="Search stables, horses, or locations…"
                value={search.search ?? ""}
                onChange={(e) => update({ search: e.target.value || undefined })}
                className="pl-11 h-12 rounded-sm border-hairline bg-surface-elevated text-base"
              />
            </div>
            <Button variant="outline" className="rounded-sm h-12" onClick={() => setFiltersOpen((v) => !v)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </Button>
            <select
              value={search.sort ?? "recommended"}
              onChange={(e) => update({ sort: e.target.value as typeof search.sort })}
              className="h-12 px-4 rounded-sm border hairline bg-surface-elevated text-sm"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
              <option value="highest-rated">Highest rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {filtersOpen && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border hairline rounded-sm bg-surface">
              <label className="block">
                <span className="block text-[10px] tracking-luxury uppercase ink-muted mb-2">Location</span>
                <select
                  value={search.location ?? ""}
                  onChange={(e) => update({ location: e.target.value || undefined })}
                  className="w-full h-10 px-3 rounded-sm border hairline bg-background text-sm"
                >
                  <option value="">All locations</option>
                  {locations?.map((l) => <option key={l.id} value={l.name}>{l.name}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="block text-[10px] tracking-luxury uppercase ink-muted mb-2">Min rating</span>
                <select
                  value={search.minRating ?? ""}
                  onChange={(e) => update({ minRating: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full h-10 px-3 rounded-sm border hairline bg-background text-sm"
                >
                  <option value="">Any</option>
                  <option value="4">4.0+</option><option value="4.5">4.5+</option><option value="4.8">4.8+</option>
                </select>
              </label>
              <label className="block">
                <span className="block text-[10px] tracking-luxury uppercase ink-muted mb-2">Max price/hr</span>
                <select
                  value={search.maxPrice ?? ""}
                  onChange={(e) => update({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full h-10 px-3 rounded-sm border hairline bg-background text-sm"
                >
                  <option value="">Any</option>
                  <option value="800">≤ 800 EGP</option><option value="1200">≤ 1,200 EGP</option><option value="2000">≤ 2,000 EGP</option>
                </select>
              </label>
              <label className="block">
                <span className="block text-[10px] tracking-luxury uppercase ink-muted mb-2">Horse colour</span>
                <select
                  value={search.color ?? ""}
                  onChange={(e) => update({ color: e.target.value || undefined, view: e.target.value ? "horses" : undefined })}
                  className="w-full h-10 px-3 rounded-sm border hairline bg-background text-sm"
                >
                  <option value="">Any colour</option>
                  {HORSE_COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </label>
            </div>
          )}

          {/* View toggle */}
          <div className="mt-6 flex items-center gap-2">
            <button
              onClick={() => update({ view: "stables" })}
              className={`text-[11px] tracking-luxury uppercase pb-1 border-b-2 transition-colors ${view === "stables" ? "border-foreground text-foreground" : "border-transparent ink-muted"}`}
            >
              Stables ({stablesQ.data?.length ?? "…"})
            </button>
            <span className="ink-muted">/</span>
            <button
              onClick={() => update({ view: "horses" })}
              className={`text-[11px] tracking-luxury uppercase pb-1 border-b-2 transition-colors ${view === "horses" ? "border-foreground text-foreground" : "border-transparent ink-muted"}`}
            >
              Horses ({horsesQ.data?.length ?? "…"})
            </button>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12 md:py-16">
        {view === "stables" ? (
          stablesQ.isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {Array.from({ length: 6 }).map((_, i) => <StableCardSkeleton key={i} />)}
            </div>
          ) : stablesQ.data && stablesQ.data.length > 0 ? (
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {stablesQ.data.map((s) => (
                <StaggerItem key={s.id}><StableCard stable={s} /></StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <EmptyState
              icon={<X className="h-5 w-5" />}
              title="No stables match those filters."
              description="Try widening your search, or clear the filters to start again."
              action={<Button variant="outline" onClick={() => navigate({ search: {} })}>Clear filters</Button>}
            />
          )
        ) : horsesQ.isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => <HorseCardSkeleton key={i} />)}
          </div>
        ) : horsesQ.data && horsesQ.data.length > 0 ? (
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {horsesQ.data.map((h) => (
              <StaggerItem key={h.id}><HorseCard horse={h} /></StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <EmptyState
            icon={<X className="h-5 w-5" />}
            title="No horses match those filters."
            action={<Link to="/stables" className="text-sm tracking-editorial uppercase border-b hairline pb-1">Reset</Link>}
          />
        )}
      </section>
    </SiteLayout>
  );
}
