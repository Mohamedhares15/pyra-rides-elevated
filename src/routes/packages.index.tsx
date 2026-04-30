import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { PackageCard } from "@/components/cards/package-card";
import { PackageCardSkeleton } from "@/components/skeletons";
import { usePackages } from "@/lib/api/hooks";
import type { PackageType } from "@/lib/types";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Curated packages — PyraRides" },
      { name: "description", content: "Sunrise rides, sunset rides, anniversary experiences and group expeditions across the Giza and Saqqara plateaus." },
      { property: "og:title", content: "Curated packages — PyraRides" },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  const [filter, setFilter] = useState<PackageType | "ALL">("ALL");
  const { data: packages, isLoading } = usePackages({ type: filter === "ALL" ? undefined : filter });

  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-12">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Curated packages</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-foreground leading-[1.02]">
            Experiences, not transactions.
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg ink-soft leading-relaxed">
            We work with our stables to build a small, considered set of packages — from
            sunrise privates to half-day expeditions. Hotel transfers and photography included.
          </p>
        </Reveal>

        <div className="mt-12 flex items-center gap-2">
          {([
            ["ALL", "All packages"],
            ["PRIVATE_VIP", "Private · VIP"],
            ["GROUP_EVENT", "Group event"],
          ] as const).map(([v, l]) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`text-[11px] tracking-luxury uppercase pb-1 border-b-2 transition-colors ${filter === v ? "border-foreground text-foreground" : "border-transparent ink-muted"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-16 md:pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {Array.from({ length: 6 }).map((_, i) => <PackageCardSkeleton key={i} />)}
          </div>
        ) : (
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {packages?.map((p) => (
              <StaggerItem key={p.id}><PackageCard pkg={p} /></StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </SiteLayout>
  );
}
