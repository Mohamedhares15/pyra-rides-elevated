import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem, easeLuxury } from "@/components/shared/Motion";
import { LEADERBOARD } from "@/lib/mock-data/seed";
import { cn } from "@/lib/utils";

const LEAGUES = ["all", "champion", "elite", "platinum", "gold", "silver", "bronze", "wood"] as const;
type League = (typeof LEAGUES)[number];

const Users = () => {
  const [query, setQuery] = useState("");
  const [league, setLeague] = useState<League>("all");

  const riders = useMemo(() => {
    return LEADERBOARD.filter((r) => {
      const matchQ = !query || r.fullName.toLowerCase().includes(query.toLowerCase());
      const matchL = league === "all" || r.league === league;
      return matchQ && matchL;
    });
  }, [query, league]);

  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="container py-16 md:py-24 border-b hairline">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-4">The Riders</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl text-balance">
            A directory of those who ride here.
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft text-pretty">
            Members of Le Cercle, indexed quietly by hours in the saddle. Search, follow, or read their letters.
          </p>
        </Reveal>
      </section>

      {/* Sticky filter */}
      <div className="sticky top-20 z-20 bg-background/80 backdrop-blur border-b hairline">
        <div className="container py-5 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 flex-1 min-w-[220px] border-b hairline pb-2">
            <Search className="size-3.5 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a rider…"
              className="flex-1 bg-transparent text-sm font-display focus:outline-none placeholder:text-ink-muted"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {LEAGUES.map((l) => (
              <button
                key={l}
                onClick={() => setLeague(l)}
                className={cn(
                  "text-[10px] tracking-luxury uppercase px-3 py-2 border hairline transition-colors",
                  league === l ? "bg-foreground text-background border-foreground" : "hover:bg-surface/40",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-[10px] tracking-luxury uppercase text-ink-muted">{riders.length} riders</p>
        </div>
      </div>

      {/* Grid */}
      <section className="container py-16 md:py-24">
        {riders.length === 0 ? (
          <div className="border hairline py-24 text-center">
            <p className="text-[11px] tracking-luxury uppercase text-ink-muted">No riders match this register</p>
            <button
              onClick={() => { setQuery(""); setLeague("all"); }}
              className="mt-4 text-sm font-display border-b hairline pb-1 hover:border-foreground"
            >
              Reset the filters
            </button>
          </div>
        ) : (
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border hairline" gap={0.05}>
            {riders.map((r) => (
              <StaggerItem key={r.id}>
                <Link
                  to={`/users/${r.id}`}
                  className="group block bg-background p-8 h-full hover:bg-surface/30 transition-colors"
                >
                  <div className="flex items-start gap-5">
                    <span className="block size-16 overflow-hidden bg-surface shrink-0">
                      <motion.img
                        src={r.profileImageUrl}
                        alt=""
                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: easeLuxury }}
                      />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-2xl leading-tight truncate">{r.fullName}</p>
                      <p className="text-[10px] tracking-luxury uppercase text-ink-muted mt-2">№ {String(r.position).padStart(2, "0")} · {r.league}</p>
                    </div>
                    <span className="inline-flex size-9 items-center justify-center border hairline rounded-full transition-all duration-500 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                  <div className="mt-8 pt-5 border-t hairline grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] tracking-luxury uppercase text-ink-muted">Rides</p>
                      <p className="font-display text-2xl tabular-nums mt-1">{r.ridesCompleted}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-luxury uppercase text-ink-muted">Points</p>
                      <p className="font-display text-2xl tabular-nums mt-1">{r.rankPoints.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </div>
  );
};

export default Users;
