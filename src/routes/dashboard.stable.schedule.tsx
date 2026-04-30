import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import StableSchedule from "@/pages/dashboards/StableSchedule";
export const Route = createFileRoute("/dashboard/stable/schedule")({
  component: () => <RoleGuard allow={["stable_owner"]}><StableSchedule /></RoleGuard>,
});
