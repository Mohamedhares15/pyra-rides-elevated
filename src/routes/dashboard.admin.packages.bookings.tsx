import { createFileRoute } from "@tanstack/react-router";
import { AdminPackageBookingsPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/packages/bookings")({ component: AdminPackageBookingsPage });
