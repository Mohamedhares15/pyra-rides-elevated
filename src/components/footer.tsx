import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

// TikTok icon (lucide doesn't ship one)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.84a8.29 8.29 0 0 0 4.83 1.55v-3.4a4.85 4.85 0 0 1-1.9-.3z" />
    </svg>
  );
}

const COLS = [
  {
    title: "Ride",
    links: [
      { to: "/stables", label: "All stables" },
      { to: "/packages", label: "Curated packages" },
      { to: "/booking", label: "Book a horse" },
      { to: "/training", label: "Training academies" },
    ],
  },
  {
    title: "Community",
    links: [
      { to: "/cercle", label: "Le Cercle" },
      { to: "/leaderboard", label: "Leaderboard" },
      { to: "/gallery", label: "Gallery" },
      { to: "/reviews", label: "Reviews" },
    ],
  },
  {
    title: "About",
    links: [
      { to: "/about", label: "Our story" },
      { to: "/pricing", label: "Pricing" },
      { to: "/faq", label: "Frequently asked" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms of service" },
      { to: "/refund-policy", label: "Refund policy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t hairline">
      <div className="container-editorial py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Link to="/" className="font-display text-3xl">PyraRides</Link>
            <p className="mt-5 max-w-md font-display text-2xl md:text-[28px] leading-snug text-foreground">
              Where heritage meets the saddle.
            </p>
            <p className="mt-4 max-w-md text-sm ink-muted leading-relaxed">
              Egypt's first online marketplace for booking horse riding experiences at the Giza
              and Saqqara Pyramids. Eight stables. Two hundred horses. One unforgettable plateau.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border hairline hover:bg-surface transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border hairline hover:bg-surface transition-colors"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-10">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] tracking-luxury uppercase ink-muted">{col.title}</h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-sm ink-soft hover:text-foreground transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t hairline flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs ink-muted">© {new Date().getFullYear()} PyraRides. Built in Cairo.</p>
          <p className="text-xs tracking-editorial uppercase ink-muted">
            Giza · Saqqara · Dahshur · Abusir
          </p>
        </div>
      </div>
    </footer>
  );
}
