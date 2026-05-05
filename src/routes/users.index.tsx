import { createFileRoute } from "@tanstack/react-router";
import Users from "@/pages/Users";

export const Route = createFileRoute("/users/")({
  head: () => ({
    meta: [
      { title: "The Riders — PyraRides" },
      { name: "description", content: "A directory of riders on the PyraRides register." },
      { property: "og:title", content: "The Riders — PyraRides" },
      { property: "og:description", content: "Browse members of Le Cercle by league and journeys completed." },
    ],
  }),
  component: Users,
});
