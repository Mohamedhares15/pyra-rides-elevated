import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Concierge — PyraRides" },
      { name: "description", content: "Write to the PyraRides concierge for private journeys and custom itineraries at the Giza Plateau." },
      { property: "og:title", content: "Concierge — PyraRides" },
      { property: "og:description", content: "Write to the PyraRides concierge. We answer by hand, within the day." },
    ],
  }),
  component: Contact,
});
