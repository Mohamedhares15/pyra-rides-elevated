import { cn } from "@/lib/utils";
import type { League } from "@/lib/types";

const LABEL: Record<League, string> = {
  wood: "Wood",
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  elite: "Elite",
  champion: "Champion",
};

const COLOR: Record<League, string> = {
  wood: "bg-[oklch(0.55_0.06_60)]",
  bronze: "bg-[oklch(0.55_0.10_50)]",
  silver: "bg-[oklch(0.78_0.02_240)]",
  gold: "bg-accent",
  platinum: "bg-[oklch(0.85_0.02_180)]",
  elite: "bg-primary",
  champion: "bg-foreground",
};

export function RankBadge({ league, size = "sm" }: { league: League; size?: "sm" | "md" }) {
  const dim = size === "md" ? "h-2.5 w-2.5" : "h-2 w-2";
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-luxury uppercase ink-soft">
      <span className={cn("rounded-full", dim, COLOR[league])} />
      {LABEL[league]}
    </span>
  );
}
