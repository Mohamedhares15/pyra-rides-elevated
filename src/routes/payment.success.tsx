import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/payment/success")({
  head: () => ({ meta: [{ title: "Booking confirmed — PyraRides" }] }),
  component: () => (
    <SiteLayout>
      <section className="container-editorial pt-24 pb-32 max-w-xl text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-accent/20 inline-flex items-center justify-center"><Check className="h-7 w-7 text-accent-foreground" /></div>
        <p className="mt-6 text-[11px] tracking-luxury uppercase ink-muted">Confirmed</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Your ride is booked.</h1>
        <p className="mt-5 text-base ink-soft">A confirmation has been sent to your email. We'll see you on the plateau.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Button asChild className="rounded-sm"><Link to="/">Return home</Link></Button>
          <Button asChild variant="outline" className="rounded-sm"><Link to="/dashboard/rider">View bookings</Link></Button>
        </div>
      </section>
    </SiteLayout>
  ),
});
