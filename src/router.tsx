import { createRouter, useRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PageLoader } from "@/components/shared/Skeletons";

function DefaultErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracking-luxury uppercase ink-muted">Something went wrong</p>
        <h1 className="mt-3 font-display text-5xl text-foreground">A small detour.</h1>
        <p className="mt-4 text-sm ink-muted">
          An unexpected error occurred while loading this page.
        </p>
        {import.meta.env.DEV && error.message && (
          <pre className="mt-6 max-h-40 overflow-auto rounded-sm border hairline bg-surface p-3 text-left font-mono text-xs text-destructive">
            {error.message}
          </pre>
        )}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
          <Button asChild variant="outline">
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
