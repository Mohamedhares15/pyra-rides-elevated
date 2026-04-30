import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/lib/types";

/**
 * Wrap any dashboard page with <RoleGuard allow={["admin"]}>...
 * Redirects to /signin if not authenticated, /dashboard if wrong role.
 */
export const RoleGuard = ({
  allow,
  children,
}: {
  allow: UserRole[];
  children: ReactNode;
}) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate({ to: "/signin" as any, replace: true });
      return;
    }
    if (!allow.includes(user.role)) {
      navigate({ to: "/dashboard" as any, replace: true });
    }
  }, [user, isLoading, allow, navigate]);

  if (isLoading || !user) {
    return (
      <div className="container pt-40 pb-32 min-h-[60vh]">
        <p className="text-[11px] tracking-luxury uppercase text-ink-muted">
          One moment…
        </p>
      </div>
    );
  }
  if (!allow.includes(user.role)) return null;
  return <>{children}</>;
};

export default RoleGuard;
