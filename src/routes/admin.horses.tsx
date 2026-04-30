import { createFileRoute } from "@tanstack/react-router";
import AdminHorses from "@/pages/AdminHorses";
export const Route = createFileRoute("/admin/horses")({ component: AdminHorses });
