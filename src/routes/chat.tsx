import { createFileRoute } from "@tanstack/react-router";
import Chat from "@/pages/Chat";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Concierge correspondence — PyraRides" },
      { name: "description", content: "A quiet line to every estate. Coordinate your reservations with the stable directly." },
    ],
  }),
  component: Chat,
});
