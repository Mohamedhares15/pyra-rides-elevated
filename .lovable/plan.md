
# PyraRides — Phase 1: Design System + Public Marketplace

A from-scratch build of PyraRides in this TanStack Start project. Phase 1 ships the full visual language and every public-facing page. Auth and data are mocked behind clean interfaces so swapping to the real Next.js backend later is a one-file change.

Stack note: this project is **TanStack Start** (file-based routes in `src/routes/`, server functions, Tailwind v4). Routing uses `@tanstack/react-router` (`<Link to="/stables">`), not React Router. Everything else in the brief (Tailwind, shadcn/ui, framer-motion, lucide, TanStack Query, Cormorant + Inter, sonner) applies as specified.

---

## 1. Brand & Design System

**Tokens** (in `src/styles.css`, replacing the default theme):
- Background: warm cream `#F5F5DC` · Foreground/Primary: deep forest `#1B3022`
- Surface, surface-elevated, ink-soft, ink-muted, hairline as specified
- Accent: sand gold `#C9A96E` — used sparingly (badges, single rule lines, never as button fill)
- Radius: `0.25rem` (tight, editorial)
- Soft diffused shadow, optional grain texture overlay
- Light theme only (no dark mode in Phase 1)

**Typography**
- Cormorant Garamond (300/400/600) for all headings via `font-display`
- Inter for body and UI
- `tracking-luxury` utility (0.32em) for small uppercase labels

**Motion**
- `Reveal`, `StaggerGroup`, `StaggerItem` components using framer-motion
- Luxury ease `[0.2, 0.8, 0.2, 1]`, scroll-triggered fade-up, navbar blur on scroll

**Shared components**
- `SiteLayout` (Navbar + Footer wrapper)
- `Navbar` — fixed, blurs on scroll, mobile sheet drawer, respects iOS safe-area-inset-top, shows mock user state
- `Footer` — editorial grid, "Where heritage meets the saddle.", Instagram + TikTok
- `StableCard`, `HorseCard`, `PackageCard`, `ReviewCard`, `RiderRankBadge`
- `StarRating`, `EmptyState`, `LoadingSkeleton` variants, `SectionHeader`
- `SearchBar` (location + date) used on home and stables
- `LightboxGallery`, `FilterSidebar`, `PriceRangeSlider`
- All UI primitives via existing shadcn components

---

## 2. Data & Auth Layer (mocked, swappable)

`src/lib/api/` — typed client with one function per endpoint from the brief, returning realistic mock data that matches the Prisma models (Stable, Horse, Package, Review, Academy, RiderRank, etc.). Wrapped in TanStack Query hooks (`useStables`, `useStable(id)`, `usePackages`, etc.).

`src/lib/mock-data/` — curated seed data: ~8 stables around Giza/Saqqara, 30+ horses, 10 packages, reviews, leaderboard riders, gallery photos. Real, evocative copy — no lorem ipsum.

`src/hooks/use-auth.ts` — `useAuth()` returning `{ user, isLoading, signIn, signOut }`, persisted in localStorage. A small dev role-switcher so sign-in forms behave end-to-end.

When the real backend lands, only `src/lib/api/` swaps from mock to `fetch()` — pages don't change.

---

## 3. Pages in Phase 1 (~18)

Public marketplace, all production-ready (real copy, loading skeletons, empty states, error states, mobile-first):

```text
/                      Homepage — full-bleed hero, search, How It Works, featured packages, CTA
/stables               Marketplace — filters (location/price/rating/color/skills), stable↔horse toggle
/stables/$id           Stable detail — gallery, horses, reviews, packages, map, booking CTA
/packages              All curated packages with filters
/packages/$id          Package detail — itinerary, inclusions, transport zones
/booking               Booking wizard — stable → horse → date/slot → riders → confirm
/checkout              Horse booking checkout — summary, promo, payment method
/checkout/package/$id  Package checkout — date, party size, transport, promo
/gallery               Photo grid with lightbox
/leaderboard           Global rider rankings with league badges
/cercle                Le Cercle loyalty page + tiers
/about                 Heritage story, founders, mission
/faq                   Accordion FAQ
/contact               Contact form
/pricing               How fees work
/reviews               All reviews
/privacy /terms /refund-policy   Editorial legal pages
```

Plus a stable share route `/s/$stableId` reusing the stable detail with custom OG meta, and the existing 404.

Each route gets its own `head()` with unique title/description/og tags. Mobile-first throughout, sonner toasts for feedback, skeletons for every fetch.

---

## 4. Out of Phase 1 (planned for follow-ups)

So expectations are clear, these ship in later phases:
- Phase 2: auth pages (signin/signup/forgot/reset), `/dashboard/rider`, `/dashboard/loyalty`, `/users/$id`, chat
- Phase 3: stable owner dashboard + Stable OS
- Phase 4: captain, driver, cx-media dashboards
- Phase 5: full admin panel
- Phase 6: training academies (`/training/*`)
- Phase 7: PWA polish, AI agent, weather widget, push notifications

---

## 5. Technical notes (for the curious)

- `src/routes/__root.tsx` gets fonts (Cormorant + Inter) wired via `<head>` links and the new design tokens
- Tailwind v4 `@theme inline` block in `styles.css` exposes the new tokens as utilities (`bg-background`, `text-ink-muted`, `border-hairline`, etc.)
- TanStack Query installed if not already; `QueryClient` lives in `getRouter` (per-request, SSR-safe) and `QueryClientProvider` wraps `<Outlet />` in the root
- Mocked APIs simulate ~200ms latency so loading states are visible during design review
- No Lovable Cloud, no real auth, no payments wired in this phase

After you approve, I'll start with tokens + shared components (so you see the visual direction within the first iteration), then build pages in the order listed.
