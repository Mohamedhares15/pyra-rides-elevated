import { createFileRoute } from "@tanstack/react-router";
import Partner from "@/pages/Partner";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner Programme — PyraRides" },
      { name: "description", content: "Apply to join the PyraRides house. Stables, operators, and agencies of considered taste." },
      { property: "og:title", content: "Partner Programme — PyraRides" },
      { property: "og:description", content: "A small society of houses, quietly assembled." },
    ],
  }),
  component: Partner,
});
