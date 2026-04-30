import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

const MAKE = (title: string, body: string[]) => () => (
  <SiteLayout>
    <section className="container-editorial pt-16 md:pt-24 pb-24 max-w-3xl">
      <p className="text-[11px] tracking-luxury uppercase ink-muted">Legal</p>
      <h1 className="mt-4 font-display text-5xl md:text-6xl">{title}</h1>
      <div className="mt-10 space-y-5 ink-soft text-base leading-relaxed">
        {body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <p className="mt-12 text-xs ink-muted">Last updated April 2026.</p>
    </section>
  </SiteLayout>
);

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — PyraRides" }] }),
  component: MAKE("Privacy.", [
    "We collect only what we need to operate the marketplace: your name, email, phone number, ride history, and payment metadata.",
    "We never sell your data. We share booking details with the stable you book with — nothing more.",
    "You can request deletion of your account and all associated data at any time by emailing privacy@pyrarides.com.",
    "We use cookies to remember your session and improve search relevance. You can disable non-essential cookies in your browser.",
  ]),
});
