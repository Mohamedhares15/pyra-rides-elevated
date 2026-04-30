import { createFileRoute } from "@tanstack/react-router";
import { AdminInstantBookingPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/admin/instant-booking")({ component: AdminInstantBookingPage });
