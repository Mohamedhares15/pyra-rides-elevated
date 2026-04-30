import { createFileRoute } from "@tanstack/react-router";
import { AdminPackagesPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/packages/")({ component: AdminPackagesPage });
