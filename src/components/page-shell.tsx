import { type ReactNode } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

export function PageShell({ eyebrow, title, intro, children }: Props) {
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24 md:pb-36">
        <Reveal>
          {eyebrow && <p className="text-[11px] tracking-luxury uppercase ink-muted">{eyebrow}</p>}
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-foreground max-w-4xl">
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-2xl text-base md:text-lg ink-soft leading-relaxed">{intro}</p>}
        </Reveal>
        {children && <div className="mt-16">{children}</div>}
      </section>
    </SiteLayout>
  );
}
