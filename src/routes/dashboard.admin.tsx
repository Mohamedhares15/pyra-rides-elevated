import { createFileRoute } from "@tanstack/react-router";
import RoleGuard from "@/components/shared/RoleGuard";
import { SubNav } from "@/components/shared/SubNav";
import AdminGlobal from "@/pages/dashboards/AdminGlobal";

export const Route = createFileRoute("/dashboard/admin")({
  component: () => (
    <RoleGuard allow={["admin"]}>
      <SubNav kind="admin" />
      <AdminGlobal />
    </RoleGuard>
  ),
});
