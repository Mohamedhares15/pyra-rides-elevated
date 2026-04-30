import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import RiderDashboard from "@/pages/dashboards/RiderDashboard";

export const Route = createFileRoute("/dashboard/rider")({
  component: () => <RoleGuard allow={["rider"]}><RiderDashboard /></RoleGuard>,
});
