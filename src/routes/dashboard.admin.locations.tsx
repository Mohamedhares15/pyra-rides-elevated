import { createFileRoute } from "@tanstack/react-router";
import { AdminLocationsPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/locations")({ component: AdminLocationsPage });
