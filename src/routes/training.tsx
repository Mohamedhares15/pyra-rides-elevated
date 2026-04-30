import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { useAcademies } from "@/lib/api/hooks";

export const Route = createFileRoute("/training")({
  head: () => ({ meta: [{ title: "Training academies — PyraRides" }] }),
  component: TrainingPage,
});

function TrainingPage() {
  const { data } = useAcademies();
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-12">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Training</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.02]">Learn properly.</h1>
          <p className="mt-6 max-w-2xl text-base ink-soft">Two certified academies on the plateau. Foundational courses through to advanced seat work.</p>
        </Reveal>
      </section>
      <section className="container-editorial pb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((a) => (
          <Reveal key={a.id}>
            <div className="border hairline rounded-sm overflow-hidden">
              <img src={a.imageUrl} alt={a.name} className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <p className="text-[10px] tracking-luxury uppercase ink-muted">{a.location}</p>
                <h3 className="mt-2 font-display text-2xl">{a.name}</h3>
                <p className="mt-2 text-sm ink-soft">{a.description}</p>
                <div className="mt-5 pt-5 border-t hairline">
                  <p className="text-sm ink-soft"><strong>{a.captainName}</strong></p>
                  <p className="text-xs ink-muted mt-1">{a.captainBio}</p>
                </div>
                <div className="mt-5 space-y-2">
                  {a.programs.map((p) => (
                    <div key={p.id} className="flex justify-between items-baseline text-sm">
                      <span>{p.name} <span className="ink-muted">· {p.skillLevel.toLowerCase()} · {p.totalSessions} sessions</span></span>
                      <span className="tabular-nums">{p.price.toLocaleString()} EGP</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </SiteLayout>
  );
}
