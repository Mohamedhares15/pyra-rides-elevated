import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { RankBadge } from "@/components/rank-badge";
import { Skeleton } from "@/components/skeletons";
import { useLeaderboard } from "@/lib/api/hooks";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — PyraRides" }, { name: "description", content: "Global rider rankings across PyraRides. Earn rank points with every ride." }] }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const { data, isLoading } = useLeaderboard();
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-12">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted inline-flex items-center gap-2"><Trophy className="h-3.5 w-3.5" /> Leaderboard</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-foreground leading-[1.02]">The riders.</h1>
          <p className="mt-6 max-w-2xl text-base ink-soft">Every booking earns rank points. Climb seven leagues, from Wood to Champion.</p>
        </Reveal>
      </section>

      <section className="container-editorial pb-24">
        <div className="border-t hairline">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="border-b hairline py-5"><Skeleton className="h-6 w-full" /></div>)
            : data?.map((r) => (
                <div key={r.id} className="border-b hairline py-5 grid grid-cols-[40px_48px_1fr_auto_auto] items-center gap-4">
                  <span className="font-display text-2xl ink-muted tabular-nums text-right">{r.position.toString().padStart(2, "0")}</span>
                  {r.profileImageUrl
                    ? <img src={r.profileImageUrl} alt="" className="h-12 w-12 rounded-full object-cover" />
                    : <div className="h-12 w-12 rounded-full bg-surface" />}
                  <div>
                    <p className="font-display text-lg">{r.fullName}</p>
                    <p className="text-xs ink-muted">{r.ridesCompleted} rides</p>
                  </div>
                  <RankBadge league={r.league} />
                  <span className="font-display text-xl tabular-nums">{r.rankPoints.toLocaleString()}</span>
                </div>
              ))}
        </div>
      </section>
    </SiteLayout>
  );
}
