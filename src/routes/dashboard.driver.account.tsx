import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import DriverAccount from "@/pages/dashboards/DriverAccount";
export const Route = createFileRoute("/dashboard/driver/account")({
  component: () => <RoleGuard allow={["driver"]}><DriverAccount /></RoleGuard>,
});
