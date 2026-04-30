import { createFileRoute } from "@tanstack/react-router";
import RiderProfile from "@/pages/RiderProfile";
import { LEADERBOARD } from "@/lib/mock-data/seed";

export const Route = createFileRoute("/users/$id")({
  head: ({ params }) => {
    const r = LEADERBOARD.find((x) => x.id === (params as { id?: string })?.id);
    const title = r ? `${r.fullName} — Rider · PyraRides` : "Rider — PyraRides";
    const desc = r
      ? `${r.fullName} · ${r.ridesCompleted} journeys · ${r.league} league at PyraRides.`
      : "A rider on the PyraRides register.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(r?.profileImageUrl ? [{ property: "og:image", content: r.profileImageUrl }, { property: "twitter:image", content: r.profileImageUrl }] : []),
      ],
    };
  },
  component: RiderProfile,
});
