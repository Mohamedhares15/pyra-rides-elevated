import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/payment/cancel")({
  head: () => ({ meta: [{ title: "Payment cancelled — PyraRides" }] }),
  component: () => (
    <SiteLayout>
      <section className="container-editorial pt-24 pb-32 max-w-xl text-center">
        <div className="mx-auto h-14 w-14 rounded-full border hairline inline-flex items-center justify-center"><X className="h-6 w-6 ink-muted" /></div>
        <p className="mt-6 text-[11px] tracking-luxury uppercase ink-muted">Cancelled</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Payment cancelled.</h1>
        <p className="mt-5 text-base ink-soft">No charge was made. You can return and try again.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Button asChild className="rounded-sm"><Link to="/stables">Browse stables</Link></Button>
        </div>
      </section>
    </SiteLayout>
  ),
});
