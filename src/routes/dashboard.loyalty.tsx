import { createFileRoute } from "@tanstack/react-router";
import DashboardLoyalty from "@/pages/DashboardLoyalty";

export const Route = createFileRoute("/dashboard/loyalty")({
  head: () => ({
    meta: [
      { title: "Le Cercle — Your standing — PyraRides" },
      { name: "description", content: "Your loyalty standing, points, tier, and the perks each unlocks." },
    ],
  }),
  component: DashboardLoyalty,
});
