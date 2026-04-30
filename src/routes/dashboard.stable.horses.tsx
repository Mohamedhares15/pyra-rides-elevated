import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import StableHorses from "@/pages/dashboards/StableHorses";
export const Route = createFileRoute("/dashboard/stable/horses")({
  component: () => <RoleGuard allow={["stable_owner"]}><StableHorses /></RoleGuard>,
});
