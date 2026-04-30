import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — PyraRides" }] }),
  component: () => (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24 max-w-3xl">
        <p className="text-[11px] tracking-luxury uppercase ink-muted">Legal</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl">Terms of service.</h1>
        <div className="mt-10 space-y-5 ink-soft text-base leading-relaxed">
          <p>PyraRides is a marketplace connecting riders with independent stables in Egypt. By booking, you agree to the stable's safety briefing and to ride at your own risk.</p>
          <p>You must be 8 years or older to book a ride. Riders under 18 must be accompanied by a guardian.</p>
          <p>Bookings are subject to weather, horse welfare, and stable availability. We reserve the right to reschedule for safety reasons.</p>
          <p>Disputes between riders and stables are mediated by our team. Final decisions rest with PyraRides.</p>
        </div>
        <p className="mt-12 text-xs ink-muted">Last updated April 2026.</p>
      </section>
    </SiteLayout>
  ),
});
