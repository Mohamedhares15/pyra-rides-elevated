import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { RankBadge } from "@/components/rank-badge";

export const Route = createFileRoute("/dashboard/rider")({
  head: () => ({ meta: [{ title: "My rides — PyraRides" }] }),
  component: RiderDashboard,
});

function RiderDashboard() {
  const { user } = useAuth();
  if (!user) {
    return (
      <SiteLayout>
        <section className="container-editorial pt-16 pb-24 max-w-md">
          <h1 className="font-display text-4xl">Sign in to view your dashboard.</h1>
          <Button asChild className="mt-6 rounded-sm"><Link to="/signin">Sign in</Link></Button>
        </section>
      </SiteLayout>
    );
  }
  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-24">
        <p className="text-[11px] tracking-luxury uppercase ink-muted">Dashboard</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Welcome, {user.fullName.split(" ")[0]}.</h1>
        <div className="mt-3 flex items-center gap-4 text-sm ink-soft">
          <RankBadge league={user.currentLeague} />
          <span>·</span>
          <span className="tabular-nums">{user.rankPoints.toLocaleString()} rank points</span>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border hairline rounded-sm p-6 lg:col-span-2">
            <h2 className="font-display text-2xl">Upcoming rides</h2>
            <p className="mt-2 text-sm ink-muted">Your next bookings will appear here.</p>
            <Button asChild variant="outline" className="mt-6 rounded-sm"><Link to="/stables">Book a ride</Link></Button>
          </div>
          <div className="border hairline rounded-sm p-6">
            <h2 className="font-display text-2xl">Le Cercle</h2>
            <p className="mt-2 text-sm ink-muted">Member benefits, rank progress, points history.</p>
            <Button asChild variant="outline" className="mt-6 rounded-sm"><Link to="/cercle">View</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
