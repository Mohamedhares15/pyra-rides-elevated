import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cercle")({
  head: () => ({ meta: [{ title: "Le Cercle — PyraRides" }, { name: "description", content: "Membership for the riders who return. Rank points, exclusive packages, priority booking." }] }),
  component: CerclePage,
});

const TIERS = [
  { name: "Monthly Pass", price: "EGP 1,200/mo", desc: "Best for visiting riders.", perks: ["10% off every booking", "Priority slots", "Member-only packages"] },
  { name: "Annual Pass", price: "EGP 12,000/yr", desc: "Best for returning riders.", perks: ["15% off every booking", "Two free sunrise rides", "Captain's table dinner", "Doubled rank points"] },
];

export function CerclePage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-16">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Le Cercle</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-foreground leading-[1.02]">For the riders who return.</h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg ink-soft leading-relaxed">
            Le Cercle is the membership layer of PyraRides. Earn rank points with every booking,
            climb seven leagues, and unlock packages we don't list publicly.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial pb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {TIERS.map((t) => (
          <Reveal key={t.name}>
            <div className="border hairline rounded-sm p-8 h-full surface-elevated">
              <p className="text-[10px] tracking-luxury uppercase ink-muted">{t.desc}</p>
              <h3 className="mt-3 font-display text-3xl">{t.name}</h3>
              <p className="mt-2 font-display text-4xl">{t.price}</p>
              <ul className="mt-6 space-y-3">
                {t.perks.map((p) => <li key={p} className="flex items-start gap-2 text-sm ink-soft"><Check className="h-4 w-4 text-accent mt-0.5" /> {p}</li>)}
              </ul>
              <Button asChild className="mt-8 w-full rounded-sm"><Link to="/signup">Join Le Cercle</Link></Button>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-editorial pb-24">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Leagues</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Seven leagues. One plateau.</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-7 gap-4">
            {["Wood", "Bronze", "Silver", "Gold", "Platinum", "Elite", "Champion"].map((l, i) => (
              <div key={l} className="border hairline rounded-sm p-4 text-center">
                <p className="font-display text-lg">{l}</p>
                <p className="text-[10px] tracking-luxury uppercase ink-muted mt-1">{i * 1000}+</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm ink-muted">View the live <Link to="/leaderboard" className="border-b hairline pb-0.5">leaderboard</Link>.</p>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
