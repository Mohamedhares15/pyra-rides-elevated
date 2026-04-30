import { createFileRoute } from "@tanstack/react-router";
import { AdminStablesPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/stables")({ component: AdminStablesPage });
