import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import StableOverview from "@/pages/dashboards/StableOverview";
export const Route = createFileRoute("/dashboard/stable/")({
  component: () => <RoleGuard allow={["stable_owner"]}><StableOverview /></RoleGuard>,
});
