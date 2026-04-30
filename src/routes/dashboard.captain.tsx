import { createFileRoute } from "@tanstack/react-router";
import CaptainDashboard from "@/pages/dashboards/CaptainDashboard";
export const Route = createFileRoute("/dashboard/captain")({ component: CaptainDashboard });
