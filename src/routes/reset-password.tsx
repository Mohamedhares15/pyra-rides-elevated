import { createFileRoute } from "@tanstack/react-router";
import ResetPassword from "@/pages/ResetPassword";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — PyraRides" },
      { name: "description", content: "Choose a new password for your PyraRides account." },
    ],
  }),
  component: ResetPassword,
});
