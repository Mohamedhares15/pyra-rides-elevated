import { createFileRoute } from "@tanstack/react-router";
import CXMediaDashboard from "@/pages/dashboards/CXMediaDashboard";
export const Route = createFileRoute("/dashboard/cx-media")({ component: CXMediaDashboard });
