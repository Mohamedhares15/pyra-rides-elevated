import { createFileRoute } from "@tanstack/react-router";
import { AdminAcademiesPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/academies")({ component: AdminAcademiesPage });
