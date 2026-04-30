import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, Calendar, Check } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/skeletons";
import { useStable, useStableHorses, useStableSlots } from "@/lib/api/hooks";
import { formatPrice, formatTime, formatDuration } from "@/lib/format";

const searchSchema = z.object({
  stableId: z.string().optional(),
  horseId: z.string().optional(),
  date: z.string().optional(),
  step: z.coerce.number().optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Book a ride — PyraRides" }, { name: "description", content: "Choose your stable, horse, date, and time slot." }] }),
  component: BookingPage,
});

function BookingPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: stable } = useStable(search.stableId);
  const { data: horses } = useStableHorses(search.stableId);
  const horse = useMemo(() => horses?.find((h) => h.id === search.horseId), [horses, search.horseId]);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(search.date ?? today);
  const { data: slots } = useStableSlots(search.stableId, date, search.horseId);
  const [slotISO, setSlotISO] = useState<string | null>(null);
  const [riders, setRiders] = useState(1);

  const update = (next: Partial<typeof search>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }) });

  const stepNum = search.step ?? (!stable ? 1 : !horse ? 2 : !slotISO ? 3 : 4);

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-24">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Booking</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl text-foreground">Plan your ride.</h1>
        </Reveal>

        <ol className="mt-10 flex items-center gap-2 text-[11px] tracking-luxury uppercase ink-muted">
          {["Stable", "Horse", "Date & time", "Confirm"].map((label, i) => (
            <li key={label} className={`flex items-center gap-2 ${stepNum >= i + 1 ? "text-foreground" : ""}`}>
              <span className={`h-5 w-5 inline-flex items-center justify-center rounded-full text-[10px] ${stepNum >= i + 1 ? "bg-foreground text-background" : "border hairline"}`}>{i + 1}</span>
              {label}
              {i < 3 && <span className="ink-muted mx-2">/</span>}
            </li>
          ))}
        </ol>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {!search.stableId && (
              <div className="border hairline rounded-sm p-8">
                <h2 className="font-display text-2xl">Choose a stable</h2>
                <p className="mt-2 text-sm ink-muted">Start by browsing the marketplace.</p>
                <Button asChild className="mt-6 rounded-sm"><Link to="/stables">Browse stables</Link></Button>
              </div>
            )}

            {stable && (
              <div className="border hairline rounded-sm p-8">
                <p className="text-[10px] tracking-luxury uppercase ink-muted">Step 1 · Stable</p>
                <h2 className="mt-2 font-display text-3xl">{stable.name}</h2>
                <p className="mt-1 text-sm ink-muted">{stable.location} · {stable.address}</p>
                <Link to="/stables" className="mt-4 inline-flex items-center gap-2 text-xs tracking-editorial uppercase ink-soft border-b hairline pb-1">
                  <ArrowLeft className="h-3 w-3" /> Change stable
                </Link>
              </div>
            )}

            {stable && (
              <div className="border hairline rounded-sm p-8">
                <p className="text-[10px] tracking-luxury uppercase ink-muted">Step 2 · Horse</p>
                <h2 className="mt-2 font-display text-3xl">{horse ? horse.name : "Choose your horse"}</h2>
                {!horses ? (
                  <Skeleton className="h-24 mt-4" />
                ) : (
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {horses.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => update({ horseId: h.id })}
                        className={`text-left rounded-sm overflow-hidden border transition-colors ${search.horseId === h.id ? "border-foreground" : "border-hairline hover:border-foreground/40"}`}
                      >
                        <div className="aspect-square bg-surface"><img src={h.imageUrls[0]} alt={h.name} className="h-full w-full object-cover" /></div>
                        <div className="p-3">
                          <p className="font-display text-base">{h.name}</p>
                          <p className="text-xs ink-muted">{formatPrice(h.pricePerHour)}/hr</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {stable && horse && (
              <div className="border hairline rounded-sm p-8">
                <p className="text-[10px] tracking-luxury uppercase ink-muted">Step 3 · Date & time</p>
                <h2 className="mt-2 font-display text-3xl">When will you ride?</h2>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => { setDate(e.target.value); setSlotISO(null); }}
                  className="mt-5 h-11 px-4 rounded-sm border hairline bg-surface-elevated"
                />
                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {slots?.map((s) => (
                    <button
                      key={s.startTime}
                      disabled={!s.available}
                      onClick={() => setSlotISO(s.startTime)}
                      className={`h-11 rounded-sm border text-sm transition-colors ${
                        slotISO === s.startTime ? "border-foreground bg-foreground text-background" :
                        s.available ? "border-hairline hover:border-foreground/40" : "border-hairline ink-muted opacity-40 cursor-not-allowed"
                      }`}
                    >
                      {formatTime(s.startTime)}
                    </button>
                  ))}
                </div>
                {stable.minLeadTimeHours > 0 && (
                  <p className="mt-4 text-xs ink-muted">This stable requires at least {stable.minLeadTimeHours} hours' notice.</p>
                )}
              </div>
            )}

            {stable && horse && slotISO && (
              <div className="border hairline rounded-sm p-8">
                <p className="text-[10px] tracking-luxury uppercase ink-muted">Step 4 · Riders</p>
                <h2 className="mt-2 font-display text-3xl">How many riders?</h2>
                <div className="mt-5 inline-flex items-center gap-3 border hairline rounded-sm p-1">
                  <button onClick={() => setRiders(Math.max(1, riders - 1))} className="h-9 w-9 rounded-sm hover:bg-surface">−</button>
                  <span className="w-8 text-center tabular-nums">{riders}</span>
                  <button onClick={() => setRiders(Math.min(6, riders + 1))} className="h-9 w-9 rounded-sm hover:bg-surface">+</button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 surface-elevated border hairline rounded-sm p-6 shadow-soft">
              <h3 className="font-display text-xl">Summary</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4"><dt className="ink-muted">Stable</dt><dd className="text-right">{stable?.name ?? "—"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="ink-muted">Horse</dt><dd className="text-right">{horse?.name ?? "—"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="ink-muted">Date</dt><dd>{date}</dd></div>
                <div className="flex justify-between gap-4"><dt className="ink-muted">Time</dt><dd>{slotISO ? formatTime(slotISO) : "—"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="ink-muted">Riders</dt><dd>{riders}</dd></div>
                <div className="flex justify-between gap-4"><dt className="ink-muted">Duration</dt><dd>{formatDuration(1)}</dd></div>
              </dl>
              <div className="mt-5 pt-5 border-t hairline flex justify-between items-baseline">
                <span className="text-sm ink-muted">Estimated total</span>
                <span className="font-display text-2xl tabular-nums">{horse ? formatPrice(horse.pricePerHour * riders) : "—"}</span>
              </div>
              <Button asChild size="lg" disabled={!stable || !horse || !slotISO} className="mt-6 w-full rounded-sm">
                <Link to="/checkout">Continue to checkout <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <p className="mt-3 text-xs ink-muted text-center inline-flex items-center justify-center gap-1.5 w-full"><Check className="h-3 w-3" /> Free cancellation up to 24 hours before</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
