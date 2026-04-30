import { createFileRoute } from "@tanstack/react-router";
import { AdminUsersPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/users")({ component: AdminUsersPage });
