import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center px-6 py-16", className)}>
      {icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border hairline ink-muted">
          {icon}
        </div>
      )}
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm ink-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
