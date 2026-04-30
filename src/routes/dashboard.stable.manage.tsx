import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import StableManage from "@/pages/dashboards/StableManage";
export const Route = createFileRoute("/dashboard/stable/manage")({
  component: () => <RoleGuard allow={["stable_owner"]}><StableManage /></RoleGuard>,
});
