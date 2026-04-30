import { createFileRoute } from "@tanstack/react-router";
import { AdminPremiumPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/premium")({ component: AdminPremiumPage });
