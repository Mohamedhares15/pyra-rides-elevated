import { Link, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/shared/SiteLayout";

interface RouterContext {
  queryClient: QueryClient;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracking-luxury uppercase ink-muted">Error 404</p>
        <h1 className="mt-3 font-display text-6xl text-foreground">Off the trail.</h1>
        <p className="mt-4 text-sm ink-muted">
          The page you're looking for doesn't exist. The plateau is wide — let us guide you back.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/stables">Browse stables</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#F5F5DC" },
      { title: "PyraRides — Ride at the Pyramids" },
      {
        name: "description",
        content:
          "Egypt's first online marketplace for booking horse riding experiences at the Giza and Saqqara Pyramids. Eight stables. Two hundred horses. One unforgettable plateau.",
      },
      { name: "author", content: "PyraRides" },
      { property: "og:title", content: "PyraRides — Ride at the Pyramids" },
      {
        property: "og:description",
        content: "Book a horse and ride past the Great Pyramids. Verified stables, trained horses, modern booking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@pyrarides" },
      { name: "twitter:title", content: "PyraRides — Ride at the Pyramids" },
      { name: "description", content: "Book horse riding experiences at Egypt's Giza and Saqqara Pyramids." },
      { property: "og:description", content: "Book horse riding experiences at Egypt's Giza and Saqqara Pyramids." },
      { name: "twitter:description", content: "Book horse riding experiences at Egypt's Giza and Saqqara Pyramids." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e808453b-559a-41bd-b88f-33ed6742daea/id-preview-6c66c525--aceced69-9002-4dbe-ac56-630ec0ae069f.lovable.app-1777810018640.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e808453b-559a-41bd-b88f-33ed6742daea/id-preview-6c66c525--aceced69-9002-4dbe-ac56-630ec0ae069f.lovable.app-1777810018640.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteLayout />
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "!bg-surface-elevated !border !border-hairline !text-foreground !rounded-sm !font-sans",
          },
        }}
      />
    </QueryClientProvider>
  );
}
