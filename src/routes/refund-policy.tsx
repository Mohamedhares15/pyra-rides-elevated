import { createFileRoute } from "@tanstack/react-router";
import { RefundPolicy } from "@/pages/Legal";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — PyraRides" },
      { name: "description", content: "When a journey cannot be kept — how PyraRides handles refunds, fairly, for rider and stable." },
    ],
  }),
  component: RefundPolicy,
});
