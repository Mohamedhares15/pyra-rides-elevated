import { createFileRoute, useParams } from "@tanstack/react-router";
import StableDetail from "@/pages/StableDetail";
import { stables } from "@/data/mock";

function StableShare() {
  // Bridge /s/$stableId → StableDetail (which reads `id`) by injecting param.
  const { stableId } = useParams({ from: "/s/$stableId" });
  // Render StableDetail inside a context where useParams returns { id }.
  // Simplest: render directly and let strict:false expose stableId — but
  // StableDetail expects `id`. Use a tiny in-memory swap via window.history.
  // Cleanest: just inline the lookup ourselves and forward as a key.
  return <StableDetail key={stableId} _idOverride={stableId} />;
}

export const Route = createFileRoute("/s/$stableId")({
  head: ({ params }) => {
    const stable = stables.find((s) => s.id === (params as { stableId?: string })?.stableId);
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
  component: StableShare,
});
