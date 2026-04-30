import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import DriverHistory from "@/pages/dashboards/DriverHistory";
export const Route = createFileRoute("/dashboard/driver/history")({
  component: () => <RoleGuard allow={["driver"]}><DriverHistory /></RoleGuard>,
});
