import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { c: "Booking", q: "How far in advance should I book?", a: "Most stables accept bookings up to 4 hours in advance. Sunrise rides and the Anniversary package are best booked 48 hours ahead." },
  { c: "Booking", q: "Can I book for a group?", a: "Yes — every horse booking supports up to six riders. For larger groups, look at the group event packages." },
  { c: "Payment", q: "What payment methods do you accept?", a: "Card (Visa, Mastercard) via Paymob, or cash on arrival at the stable. Promo codes apply to either." },
  { c: "Payment", q: "When am I charged?", a: "For card bookings, immediately at checkout. For cash bookings, on arrival at the stable." },
  { c: "Cancellation", q: "Can I cancel?", a: "Free cancellation up to 24 hours before most rides, 48 hours for premium packages. After that, standard refund rules apply — see our refund policy." },
  { c: "Safety", q: "Is riding here safe for beginners?", a: "Yes. Several of our stables specialise in beginner riders. Filter by 'beginner-friendly' or check horse tier when booking." },
  { c: "Safety", q: "Are helmets provided?", a: "All stables on PyraRides provide helmets. We require riders to wear them." },
  { c: "On the day", q: "What should I wear?", a: "Closed-toe shoes, long trousers, and layers — early mornings can be cold. Sunglasses and a hat are essential mid-day." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — PyraRides" }, { name: "description", content: "Answers to common questions about booking, payment, safety, and the ride." }] }),
  component: FaqPage,
});

function FaqPage() {
  const cats = Array.from(new Set(FAQS.map((f) => f.c)));
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-12">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Frequently asked</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Questions, answered.</h1>
        </Reveal>
      </section>

      <section className="container-editorial pb-24 max-w-3xl">
        {cats.map((c) => (
          <div key={c} className="mb-10">
            <h2 className="text-[11px] tracking-luxury uppercase ink-muted mb-3">{c}</h2>
            <Accordion type="single" collapsible>
              {FAQS.filter((f) => f.c === c).map((f, i) => (
                <AccordionItem key={i} value={`${c}-${i}`} className="border-hairline">
                  <AccordionTrigger className="font-display text-xl text-left hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="ink-soft text-base leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
