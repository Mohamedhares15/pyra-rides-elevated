import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useAuth } from "@/hooks/use-auth";
import { RankBadge } from "@/components/rank-badge";

export const Route = createFileRoute("/users/$id")({
  head: () => ({ meta: [{ title: "Rider profile — PyraRides" }] }),
  component: () => {
    const { user } = useAuth();
    if (!user) return <SiteLayout><div className="container-editorial py-16 ink-muted">Sign in to view profiles.</div></SiteLayout>;
    return (
      <SiteLayout>
        <section className="container-editorial pt-12 pb-24 max-w-3xl">
          <div className="flex items-start gap-6">
            {user.profileImageUrl ? <img src={user.profileImageUrl} alt="" className="h-24 w-24 rounded-full object-cover" /> : <div className="h-24 w-24 rounded-full bg-surface" />}
            <div>
              <h1 className="font-display text-4xl">{user.fullName}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm ink-soft">
                <RankBadge league={user.currentLeague} />
                <span>·</span>
                <span className="tabular-nums">{user.rankPoints.toLocaleString()} pts</span>
              </div>
              {user.bio && <p className="mt-4 text-base ink-soft max-w-xl">{user.bio}</p>}
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  },
});
