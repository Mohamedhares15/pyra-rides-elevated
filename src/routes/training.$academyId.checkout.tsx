import { createFileRoute } from "@tanstack/react-router";
import TrainingCheckout from "@/pages/TrainingCheckout";
export const Route = createFileRoute("/training/$academyId/checkout")({ component: TrainingCheckout });
