import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — PyraRides" }, { name: "description", content: "Transparent pricing. No surprises." }] }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Pricing</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-3xl leading-[1.02]">Transparent. Always.</h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg ink-soft leading-relaxed">
            Every horse on PyraRides has a single hourly price set by its stable. We add no booking fees on top — what you see is what you pay.
          </p>
        </Reveal>

        <Reveal className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "Horse rides", p: "From EGP 650/hr", d: "Hourly rates set by each stable. Group bookings priced per rider." },
            { t: "Curated packages", p: "From EGP 3,400", d: "All-inclusive experiences with hotel transfer and photography." },
            { t: "Training programs", p: "From EGP 6,800", d: "Multi-session courses at certified academies." },
          ].map((c) => (
            <div key={c.t} className="border hairline rounded-sm p-8">
              <p className="text-[10px] tracking-luxury uppercase ink-muted">{c.t}</p>
              <p className="mt-3 font-display text-3xl">{c.p}</p>
              <p className="mt-3 text-sm ink-soft">{c.d}</p>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <div className="mt-16 border-t hairline pt-10 max-w-3xl space-y-4 text-sm ink-soft leading-relaxed">
            <p><strong>How fees work:</strong> PyraRides charges stables a 15–18% commission on every booking. Riders pay the listed price. Nothing more.</p>
            <p><strong>Cancellation:</strong> Free cancellation up to 24 hours before most rides, 48 hours for premium packages.</p>
            <p><strong>Promo codes:</strong> Visit our <a className="border-b hairline pb-0.5">FAQ</a> for current offers.</p>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
