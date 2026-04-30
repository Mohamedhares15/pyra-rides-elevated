import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import { SubNav } from "@/components/shared/SubNav";
import CXMediaDashboard from "@/pages/dashboards/CXMediaDashboard";

export const Route = createFileRoute("/dashboard/cx-media")({
  component: () => (
    <RoleGuard allow={["cx_media"]}>
      <SubNav kind="cx" />
      <CXMediaDashboard />
    </RoleGuard>
  ),
});
