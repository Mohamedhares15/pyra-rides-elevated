import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { HERO_IMAGE } from "@/lib/mock-data/seed";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — PyraRides" }, { name: "description", content: "Egypt's first marketplace for booking horse riding experiences at the Pyramids. Built in Cairo." }, { property: "og:image", content: HERO_IMAGE }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-16">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">About</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-foreground leading-[1.02] max-w-4xl">
            For sixty years, the only way to ride here was to know someone.
          </h1>
        </Reveal>
      </section>

      <section className="container-editorial pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-7 space-y-6 text-base md:text-lg ink-soft leading-relaxed">
          <p>PyraRides was founded in 2024 by Mohamed Hares and Seif Askalany — a stable owner and a software engineer who grew up riding the same plateau.</p>
          <p>For decades, booking a horse at the pyramids meant phoning ahead, hoping for a friend of a friend, and accepting whatever was available when you arrived. The horses were beautiful. The system was broken.</p>
          <p>We built PyraRides to digitise the entire sector — verified stables, real reviews, transparent pricing, and a booking that confirms in seconds. Eight stables. Two hundred horses. One unforgettable plateau.</p>
          <p>We are headquartered in Cairo, employ riders, drivers, captains and stable hands across Giza and Saqqara, and reinvest a portion of every booking into horse welfare.</p>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-px bg-hairline border hairline">
            {[
              { n: "8", l: "Stables" },
              { n: "200+", l: "Horses" },
              { n: "12k+", l: "Rides" },
              { n: "4.8★", l: "Average rating" },
            ].map((s) => (
              <div key={s.l} className="bg-background p-8">
                <p className="font-display text-4xl">{s.n}</p>
                <p className="mt-2 text-[11px] tracking-luxury uppercase ink-muted">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border hairline rounded-sm p-6">
            <p className="text-[11px] tracking-luxury uppercase ink-muted">Founders</p>
            <p className="mt-3 font-display text-2xl">Mohamed Hares</p>
            <p className="text-sm ink-muted">Hares Arabian Stud · 31 years on the plateau.</p>
            <p className="mt-4 font-display text-2xl">Seif Askalany</p>
            <p className="text-sm ink-muted">Engineer · Cairo born, plateau raised.</p>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
