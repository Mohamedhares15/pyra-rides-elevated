import { createFileRoute } from "@tanstack/react-router";
import Leaderboard from "@/pages/Leaderboard";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "The Register — PyraRides" },
      { name: "description", content: "Riders of the season at the Pyramids, ranked quietly. Updated weekly." },
      { property: "og:title", content: "The Register — PyraRides" },
      { property: "og:description", content: "Riders of the season at the Pyramids, ranked quietly." },
    ],
  }),
  component: Leaderboard,
});
