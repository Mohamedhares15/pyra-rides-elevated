import { Reveal } from "@/components/shared/Motion";
import { Leaderboard as LeaderboardList } from "@/components/social/Leaderboard";

const Leaderboard = () => (
  <div className="min-h-screen pt-28">
    <section className="container py-16 md:py-24 border-b hairline">
      <Reveal>
        <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-4">The Register</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl text-balance">
          Riders of the season, in order.
        </h1>
        <p className="mt-6 max-w-xl text-base text-ink-soft text-pretty">
          A quiet ranking. Hours in the saddle, journeys completed, letters received. Updated at first light each Monday.
        </p>
      </Reveal>
    </section>

    <LeaderboardList />
  </div>
);

export default Leaderboard;
