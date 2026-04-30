import { createFileRoute } from "@tanstack/react-router";
import StableDetail from "@/pages/StableDetail";
import { stables } from "@/data/mock";

export const Route = createFileRoute("/s/$stableId")({
  head: ({ params }) => {
    const stable = stables.find((s) => s.id === params?.stableId);
    const title = stable ? `${stable.name} — PyraRides` : "A stable on the plateau — PyraRides";
    const desc = stable?.description ?? "A private estate at the Giza Plateau, on PyraRides.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(stable?.image ? [{ property: "og:image", content: stable.image }, { property: "twitter:image", content: stable.image }] : []),
      ],
    };
  },
  component: StableDetail,
});
