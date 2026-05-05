import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Reveal, StaggerGroup, StaggerItem, easeLuxury } from "@/components/shared/Motion";
import { cn } from "@/lib/utils";

type PartnerType = "stable_owner" | "tour_operator" | "travel_agency" | "corporate";

const PARTNER_TYPES: { id: PartnerType; label: string; french: string; description: string }[] = [
  { id: "stable_owner", label: "Stable Owner", french: "Propriétaire", description: "List your stable, horses, and journeys on the PyraRides register." },
  { id: "tour_operator", label: "Tour Operator", french: "Opérateur", description: "Curate multi-day expeditions and bespoke itineraries for your guests." },
  { id: "travel_agency", label: "Travel Agency", french: "Agence", description: "Reserve on behalf of clientele with preferred-rate access." },
  { id: "corporate", label: "Corporate House", french: "Maison", description: "Private retreats, executive offsites, and ceremonial bookings." },
];

const Partner = () => {
  const [type, setType] = useState<PartnerType>("stable_owner");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    website: "",
    pitch: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName || !form.contactName || !form.email) {
      toast.error("A few essentials are missing.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success("Application received. The house will write within seven days.");
    setForm({ businessName: "", contactName: "", email: "", phone: "", country: "", website: "", pitch: "" });
  };

  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="container py-16 md:py-24 border-b hairline">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-4">Partner Programme</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl text-balance">
            A small society of houses, quietly assembled.
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft text-pretty">
            We invite stables, operators, and agencies of considered taste to join our register.
            Applications are reviewed in private. We respond within seven days.
          </p>
        </Reveal>
      </section>

      {/* Type selector */}
      <section className="container py-20 md:py-28 border-b hairline">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-3">I. Choose your house</p>
          <h2 className="font-display text-3xl md:text-5xl max-w-2xl">Which kind of partnership?</h2>
        </Reveal>
        <StaggerGroup className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border hairline" gap={0.06}>
          {PARTNER_TYPES.map((t) => (
            <StaggerItem key={t.id}>
              <button
                type="button"
                onClick={() => setType(t.id)}
                className={cn(
                  "w-full h-full text-left p-8 bg-background transition-colors duration-500 group",
                  type === t.id ? "bg-foreground text-background" : "hover:bg-surface/40",
                )}
              >
                <p className={cn(
                  "text-[10px] tracking-luxury uppercase mb-4",
                  type === t.id ? "text-background/60" : "text-ink-muted"
                )}>{t.french}</p>
                <p className="font-display text-2xl leading-tight">{t.label}</p>
                <p className={cn("mt-4 text-sm leading-relaxed", type === t.id ? "text-background/80" : "text-ink-soft")}>
                  {t.description}
                </p>
                <span className={cn(
                  "mt-6 inline-flex items-center gap-2 text-[10px] tracking-luxury uppercase",
                  type === t.id ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                )}>
                  <Check className="size-3" /> Selected
                </span>
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Form */}
      <section className="container py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-4">
            <p className="text-[11px] tracking-luxury uppercase text-ink-muted mb-3">II. The application</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05]">Tell us about your house.</h2>
            <p className="mt-6 text-sm text-ink-soft leading-relaxed">
              Each application is read by a member of the partnership desk. We do not maintain a waitlist; we either
              respond with a reservation for an exploratory call, or write to explain why this season is not the right one.
            </p>
            <ul className="mt-10 space-y-3 text-[11px] tracking-luxury uppercase text-ink-muted">
              <li className="flex items-center gap-3"><span className="size-1 rounded-full bg-foreground" /> Reviewed within 7 days</li>
              <li className="flex items-center gap-3"><span className="size-1 rounded-full bg-foreground" /> Private, not published</li>
              <li className="flex items-center gap-3"><span className="size-1 rounded-full bg-foreground" /> No obligation to proceed</li>
            </ul>
          </Reveal>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: easeLuxury }}
            className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-hairline border hairline"
          >
            {[
              { k: "businessName", label: "Business name", placeholder: "Al-Nasr Heritage Stables", span: 2 },
              { k: "contactName", label: "Contact name", placeholder: "Hassan El-Sayed" },
              { k: "email", label: "Email", placeholder: "house@example.com", type: "email" },
              { k: "phone", label: "Telephone", placeholder: "+20 ..." },
              { k: "country", label: "Country", placeholder: "Egypt" },
              { k: "website", label: "Website", placeholder: "https://...", span: 2 },
            ].map((f) => (
              <label key={f.k} className={cn("bg-background p-6 flex flex-col gap-2", f.span === 2 && "sm:col-span-2")}>
                <span className="text-[10px] tracking-luxury uppercase text-ink-muted">{f.label}</span>
                <input
                  type={f.type ?? "text"}
                  value={form[f.k as keyof typeof form]}
                  onChange={update(f.k as keyof typeof form)}
                  placeholder={f.placeholder}
                  className="bg-transparent border-0 border-b hairline pb-2 text-base font-display focus:outline-none focus:border-foreground transition-colors"
                />
              </label>
            ))}
            <label className="sm:col-span-2 bg-background p-6 flex flex-col gap-2">
              <span className="text-[10px] tracking-luxury uppercase text-ink-muted">A short letter</span>
              <textarea
                value={form.pitch}
                onChange={update("pitch")}
                rows={6}
                placeholder="Tell us about your house, your horses, and the kind of guest you receive."
                className="bg-transparent border-0 border-b hairline pb-2 text-sm leading-relaxed focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </label>
            <div className="sm:col-span-2 bg-background p-6 flex items-center justify-between gap-6">
              <p className="text-[10px] tracking-luxury uppercase text-ink-muted">
                Applying as · {PARTNER_TYPES.find((t) => t.id === type)?.label}
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-8 py-3 bg-foreground text-background text-[11px] tracking-[0.18em] uppercase disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Submit application"}
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Partner;
