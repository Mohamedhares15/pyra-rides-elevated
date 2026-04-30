import { createFileRoute } from "@tanstack/react-router";
import Pricing from "@/pages/Pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "House Pricing — PyraRides" },
      { name: "description", content: "Plain prices for private rides at the Pyramids. No hidden fees, no service surcharges." },
      { property: "og:title", content: "House Pricing — PyraRides" },
      { property: "og:description", content: "Three tiers. One promise: the figure you see is the figure you pay." },
    ],
  }),
  component: Pricing,
});
