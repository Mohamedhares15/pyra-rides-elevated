import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import DriverDashboard from "@/pages/dashboards/DriverDashboard";
import { SubNav } from "@/components/shared/SubNav";

export const Route = createFileRoute("/dashboard/driver/")({
  component: () => (
    <RoleGuard allow={["driver"]}>
      <SubNav kind="driver" />
      <DriverDashboard />
    </RoleGuard>
  ),
});
