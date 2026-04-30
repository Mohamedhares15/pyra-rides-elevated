import { createFileRoute } from "@tanstack/react-router";
import AcademyDetail from "@/pages/AcademyDetail";
export const Route = createFileRoute("/training/$academyId/")({ component: AcademyDetail });
