import { createFileRoute } from "@tanstack/react-router";
import CheckoutPackage from "@/pages/CheckoutPackage";
export const Route = createFileRoute("/checkout/package/$id")({ component: CheckoutPackage });
