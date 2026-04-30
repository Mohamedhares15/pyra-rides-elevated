import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({ meta: [{ title: "Refund policy — PyraRides" }] }),
  component: () => (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24 max-w-3xl">
        <p className="text-[11px] tracking-luxury uppercase ink-muted">Legal</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl">Refund policy.</h1>
        <div className="mt-10 space-y-5 ink-soft text-base leading-relaxed">
          <p><strong>Standard rides:</strong> Full refund if cancelled at least 24 hours before the ride. After that, 50% refund up to 4 hours before. No refund within 4 hours.</p>
          <p><strong>Premium packages:</strong> Full refund up to 48 hours before. 50% up to 24 hours. No refund after that.</p>
          <p><strong>Weather:</strong> If the stable cancels for safety reasons, you receive a full refund or a free reschedule.</p>
          <p>Refunds are processed within 5 business days to the original payment method.</p>
        </div>
        <p className="mt-12 text-xs ink-muted">Last updated April 2026.</p>
      </section>
    </SiteLayout>
  ),
});
