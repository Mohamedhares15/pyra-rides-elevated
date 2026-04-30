import { createFileRoute } from "@tanstack/react-router";
import { CXGalleryPage } from "@/pages/dashboards/CXPages";
export const Route = createFileRoute("/dashboard/cx-media/gallery")({ component: CXGalleryPage });
