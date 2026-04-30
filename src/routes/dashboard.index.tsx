import { createFileRoute } from "@tanstack/react-router";
import DashboardRouter from "@/pages/DashboardRouter";
export const Route = createFileRoute("/dashboard/")({ component: DashboardRouter });
