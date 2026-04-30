import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import CaptainDashboard from "@/pages/dashboards/CaptainDashboard";

export const Route = createFileRoute("/dashboard/captain")({
  component: () => (
    <RoleGuard allow={["captain"]}>
      <CaptainDashboard />
    </RoleGuard>
  ),
});
