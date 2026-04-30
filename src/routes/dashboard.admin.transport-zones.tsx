import { createFileRoute } from "@tanstack/react-router";
import { AdminTransportZonesPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/transport-zones")({ component: AdminTransportZonesPage });
