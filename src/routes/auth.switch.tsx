import { createFileRoute } from "@tanstack/react-router";
import DevSwitch from "@/pages/DevSwitch";

export const Route = createFileRoute("/auth/switch")({
  head: () => ({
    meta: [
      { title: "House switchboard — PyraRides" },
      { name: "description", content: "Step into any seat at the table — rider, captain, owner, admin." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DevSwitch,
});
