import { type ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface Props {
  children: ReactNode;
  /** When true, content sits flush under a transparent navbar (e.g. homepage hero). */
  transparentNav?: boolean;
}

export function SiteLayout({ children, transparentNav = false }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className={transparentNav ? "" : "pt-16 md:pt-20"}>{children}</main>
      <Footer />
    </div>
  );
}
