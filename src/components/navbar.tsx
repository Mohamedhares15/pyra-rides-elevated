import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/stables", label: "Stables" },
  { to: "/packages", label: "Packages" },
  { to: "/cercle", label: "Le Cercle" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pad-safe-top transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b hairline"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-editorial flex h-16 md:h-20 items-center justify-between gap-6">
        <Link to="/" className="group inline-flex items-baseline gap-1">
          <span className="font-display text-2xl md:text-[28px] leading-none text-foreground tracking-tight">
            PyraRides
          </span>
          <span className="hidden md:inline-block h-1.5 w-1.5 rounded-full bg-accent translate-y-[-2px]" aria-hidden />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[13px] tracking-editorial uppercase ink-soft hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/users/$id"
                params={{ id: user.id }}
                className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
              >
                {user.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <UserIcon className="h-5 w-5" />
                )}
                <span className="hidden lg:inline ink-soft">{user.fullName.split(" ")[0]}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="rounded-sm">
                <Link to="/stables">Book a ride</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm border hairline"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm bg-background border-l hairline p-0">
            <div className="flex h-full flex-col pad-safe-top">
              <div className="flex items-center justify-between px-6 h-16 border-b hairline">
                <span className="font-display text-2xl">PyraRides</span>
                <SheetClose className="inline-flex h-9 w-9 items-center justify-center rounded-sm border hairline">
                  <X className="h-4 w-4" />
                </SheetClose>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-6">
                  {NAV_LINKS.map((l) => (
                    <li key={l.to}>
                      <SheetClose asChild>
                        <Link
                          to={l.to}
                          className="block font-display text-3xl text-foreground"
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 pt-6 border-t hairline space-y-3">
                  {user ? (
                    <>
                      <SheetClose asChild>
                        <Link to="/dashboard/rider" className="block text-sm tracking-editorial uppercase ink-soft">
                          Dashboard
                        </Link>
                      </SheetClose>
                      <button onClick={signOut} className="block text-sm tracking-editorial uppercase ink-soft">
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Link to="/signin" className="block text-sm tracking-editorial uppercase ink-soft">Sign in</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/signup" className="block text-sm tracking-editorial uppercase ink-soft">Create account</Link>
                      </SheetClose>
                    </>
                  )}
                </div>
              </nav>
              <div className="px-6 pb-8 pad-safe-bottom">
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-sm">
                    <Link to="/stables">Book a ride</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
