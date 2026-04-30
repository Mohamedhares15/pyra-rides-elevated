import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { ReviewCard } from "@/components/cards/review-card";
import { useReviews } from "@/lib/api/hooks";
import { Skeleton } from "@/components/skeletons";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Reviews — PyraRides" }, { name: "description", content: "Every review left by every rider, across every stable." }] }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { data, isLoading } = useReviews();
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-12">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Reviews</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.02]">From every rider, every ride.</h1>
        </Reveal>
      </section>
      <section className="container-editorial pb-24 max-w-4xl">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 mb-6" />)
          : <StaggerGroup className="space-y-2">{data?.map((r) => <StaggerItem key={r.id}><ReviewCard review={r} /></StaggerItem>)}</StaggerGroup>}
      </section>
    </SiteLayout>
  );
}
