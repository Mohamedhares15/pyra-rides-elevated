import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import RiderDashboard from "@/pages/dashboards/RiderDashboard";

const ROLE_TO_PATH: Record<string, string> = {
  admin: "/dashboard/admin",
  stable_owner: "/dashboard/stable",
  captain: "/dashboard/captain",
  driver: "/dashboard/driver",
  cx_media: "/dashboard/cx-media",
};

const DashboardRouter = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate({ to: "/signin" as any, replace: true });
      return;
    }
    const target = ROLE_TO_PATH[user.role];
    if (target) navigate({ to: target as any, replace: true });
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="container pt-40 pb-32 min-h-[60vh]">
        <p className="text-[11px] tracking-luxury uppercase text-ink-muted">One moment…</p>
      </div>
    );
  }

  if (user.role === "rider") return <RiderDashboard />;
  return null;
};

export default DashboardRouter;
