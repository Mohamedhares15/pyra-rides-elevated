import { createFileRoute } from "@tanstack/react-router";
import { AdminUploadHorsesPage } from "@/pages/dashboards/AdminPages";
export const Route = createFileRoute("/admin/upload-horses")({ component: AdminUploadHorsesPage });
