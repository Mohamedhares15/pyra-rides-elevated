import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { Skeleton } from "@/components/skeletons";
import { useGallery } from "@/lib/api/hooks";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — PyraRides" }, { name: "description", content: "Photographs from riders across the Giza and Saqqara plateaus." }] }),
  component: GalleryPage,
});

function GalleryPage() {
  const { data, isLoading } = useGallery();
  const [active, setActive] = useState<string | null>(null);
  const activeItem = data?.find((g) => g.id === active);

  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-12">
        <p className="text-[11px] tracking-luxury uppercase ink-muted">Gallery</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl text-foreground leading-[1.02]">From the saddle.</h1>
        <p className="mt-6 max-w-2xl text-base ink-soft">Photographs sent in by riders. Tap any image to view it full screen.</p>
      </section>

      <section className="container-editorial pb-24">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="aspect-square" />)}
          </div>
        ) : (
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {data?.map((g) => (
              <StaggerItem key={g.id}>
                <button onClick={() => setActive(g.id)} className="group relative block aspect-square overflow-hidden rounded-sm bg-surface w-full">
                  <img src={g.url} alt={g.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-xs text-background">{g.caption}</p>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      {activeItem && (
        <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <button aria-label="Close" className="absolute top-4 right-4 h-10 w-10 inline-flex items-center justify-center rounded-sm border border-background/20 text-background"><X className="h-5 w-5" /></button>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={activeItem.url} alt={activeItem.caption} className="w-full max-h-[85vh] object-contain" />
            <figcaption className="mt-4 text-center text-sm text-background/85">{activeItem.caption} — {activeItem.riderName}{activeItem.stableName && ` · ${activeItem.stableName}`}</figcaption>
          </figure>
        </div>
      )}
    </SiteLayout>
  );
}
