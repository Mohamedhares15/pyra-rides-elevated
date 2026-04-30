import { createFileRoute } from "@tanstack/react-router";
import Packages from "@/pages/Packages";
export const Route = createFileRoute("/packages/")({ component: Packages });
