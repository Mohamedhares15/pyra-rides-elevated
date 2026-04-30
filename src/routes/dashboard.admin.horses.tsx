import { createFileRoute } from "@tanstack/react-router";
import { AdminHorsesPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/horses")({ component: AdminHorsesPage });
