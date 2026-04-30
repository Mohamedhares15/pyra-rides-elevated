import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import StableOS from "@/pages/dashboards/StableOS";
export const Route = createFileRoute("/dashboard/stable/os")({
  component: () => <RoleGuard allow={["stable_owner"]}><StableOS /></RoleGuard>,
});
