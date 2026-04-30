import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import DriverActive from "@/pages/dashboards/DriverActive";
export const Route = createFileRoute("/dashboard/driver/active")({
  component: () => <RoleGuard allow={["driver"]}><DriverActive /></RoleGuard>,
});
