import { createFileRoute } from "@tanstack/react-router";
import { AdminAnalyticsPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/dashboard/analytics")({ component: AdminAnalyticsPage });
