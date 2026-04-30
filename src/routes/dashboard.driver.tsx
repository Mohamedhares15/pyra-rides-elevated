import { createFileRoute } from "@tanstack/react-router";
import DriverDashboard from "@/pages/dashboards/DriverDashboard";
export const Route = createFileRoute("/dashboard/driver")({ component: DriverDashboard });
