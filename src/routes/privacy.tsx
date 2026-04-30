import { createFileRoute } from "@tanstack/react-router";
import { Privacy } from "@/pages/Legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — PyraRides" },
      { name: "description", content: "How PyraRides keeps the names, notes, and dates of our riders in confidence." },
    ],
  }),
  component: Privacy,
});
