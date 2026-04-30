import { createFileRoute } from "@tanstack/react-router";
import { Terms } from "@/pages/Legal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "House Terms — PyraRides" },
      { name: "description", content: "The conditions under which a journey with PyraRides is reserved and ridden." },
    ],
  }),
  component: Terms,
});
