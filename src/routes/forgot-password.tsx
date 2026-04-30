import { createFileRoute } from "@tanstack/react-router";
import ForgotPassword from "@/pages/ForgotPassword";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot password — PyraRides" },
      { name: "description", content: "Reset your PyraRides password — a quiet line will be sent to your inbox." },
    ],
  }),
  component: ForgotPassword,
});
