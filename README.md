
# pyraride ← pyra-rides-elevated · UI/UX Migration Bundle

This bundle ports the elevated **Quiet Luxury** UI into pyraride's
Next.js App Router **without touching backend or API logic**.

## Contents

```
source/                     Elevated UI as-is. Drop into pyraride/src/
  pages/  components/  hooks/  lib/  data/  styles.css
  components/shared/SiteLayout.next.tsx   ← Next-compatible variant
app/                        Next.js App Router pages (full route mapping)
  layout.tsx                Root layout (replaces __root.tsx)
  globals.css               Copy of styles.css
  _providers/query-provider.tsx
shims/
  react-router-dom.tsx      RRD → next/navigation drop-in shim
  tanstack-react-router.tsx Minimal TS-Router shim
aliases/                    Re-exports so legacy import paths keep working
ROUTE-MAP.md
COMPONENT-ALIAS.md
```

## Install steps (UI only — no backend changes)

1. **Copy `source/` into pyraride**
   - `source/pages/`      → `src/pages/`        (kept for App-Router pages to import)
   - `source/components/` → `src/components/`
   - `source/hooks/`      → `src/hooks/`
   - `source/lib/`        → `src/lib/`
   - `source/data/`       → `src/data/`
   - `source/styles.css`  → `src/app/globals.css` (or import from there)

   Replace `src/components/shared/SiteLayout.tsx` with the Next variant
   from `source/components/shared/SiteLayout.next.tsx` (rename it).

2. **Copy `app/` over pyraride's `app/`**
   - Existing pyraride pages keep their backend logic; only the JSX wrapper
     changes — every Next page in this bundle is a thin client wrapper that
     renders the elevated component.

3. **Wire the shims via tsconfig path aliases:**

   ```jsonc
   // tsconfig.json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"],
         "react-router-dom": ["./src/shims/react-router-dom.tsx"],
         "@tanstack/react-router": ["./src/shims/tanstack-react-router.tsx"]
       }
     }
   }
   ```

   Copy `shims/` to `src/shims/`. This is what lets the elevated pages
   keep their `import { Link } from "react-router-dom"` style imports
   without any code edits.

4. **Tailwind v4 / fonts**
   - `globals.css` already imports Tailwind v4, the design tokens, and the
     Cormorant Garamond + Inter font stack. No `tailwind.config.js` needed.
   - If pyraride uses `next/font`, you can swap the `<link>` in `layout.tsx`
     for `next/font/google` — the CSS variable names stay the same.

5. **Install required deps in pyraride:**

   ```bash
   pnpm add @tanstack/react-query framer-motion lucide-react sonner \
     class-variance-authority clsx tailwind-merge cmdk \
     @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
     @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-popover \
     @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-select \
     @radix-ui/react-scroll-area @radix-ui/react-switch \
     @radix-ui/react-separator @radix-ui/react-radio-group
   pnpm add -D tailwindcss@next @tailwindcss/postcss tw-animate-css
   ```

   (Match versions to elevated's `package.json` for exact parity.)

## Strict scope

This bundle is **UI/UX only**. It does not touch:
- API routes
- auth providers
- database or ORM
- env/config
- middleware

Backend logic in pyraride's existing `app/api/*` and `lib/*` is preserved.
