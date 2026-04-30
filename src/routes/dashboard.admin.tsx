import { createFileRoute } from "@tanstack/react-router";
import AdminGlobal from "@/pages/dashboards/AdminGlobal";
export const Route = createFileRoute("/dashboard/admin")({ component: AdminGlobal });
