import { createFileRoute } from "@tanstack/react-router";
import { AdminHorseChangesPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/horse-changes")({ component: AdminHorseChangesPage });
