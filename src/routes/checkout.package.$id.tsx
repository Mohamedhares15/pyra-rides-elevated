import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Lock, Check } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api/client";
import { usePackage, useTransportZones } from "@/lib/api/hooks";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/checkout/package/$id")({
  head: () => ({ meta: [{ title: "Package checkout — PyraRides" }] }),
  component: PackageCheckoutPage,
});

function PackageCheckoutPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: pkg, isLoading } = usePackage(id);
  const { data: zones } = useTransportZones();
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("06:00");
  const [guests, setGuests] = useState(2);
  const [zoneId, setZoneId] = useState("");
  const [pickupUrl, setPickupUrl] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [method, setMethod] = useState<"VISA" | "CASH">("VISA");
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) return <SiteLayout><div className="container-editorial py-16 ink-muted">Loading…</div></SiteLayout>;
  if (!pkg) throw notFound();

  const zone = zones?.find((z) => z.id === zoneId);
  const transport = zone?.price ?? 0;
  const subtotal = pkg.price + transport;
  const total = Math.round(subtotal * (1 - discount / 100));

  const applyPromo = async () => {
    const res = await api.validatePromoCode(promo);
    if (res.valid) { setDiscount(res.discountPercent); toast.success(res.message); }
    else { setDiscount(0); toast.error(res.message); }
  };

  const submit = async () => {
    if (pkg.hasTransportation && !zoneId) { toast.error("Please choose a transport zone."); return; }
    setSubmitting(true);
    try {
      await api.createPackageBooking({});
      toast.success("Package booked.");
      navigate({ to: "/payment/success" });
    } finally { setSubmitting(false); }
  };

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <Reveal>
            <p className="text-[11px] tracking-luxury uppercase ink-muted">Package checkout</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl">{pkg.title}</h1>
          </Reveal>

          <div className="border hairline rounded-sm p-6">
            <h3 className="font-display text-xl">Date & party</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="rounded-sm" />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="rounded-sm" />
              <Input type="number" min={1} max={pkg.maxPeople} value={guests} onChange={(e) => setGuests(+e.target.value)} className="rounded-sm" />
            </div>
            <p className="mt-2 text-xs ink-muted">Up to {pkg.maxPeople} guests.</p>
          </div>

          {pkg.hasTransportation && (
            <div className="border hairline rounded-sm p-6">
              <h3 className="font-display text-xl">Hotel transfer</h3>
              <select value={zoneId} onChange={(e) => setZoneId(e.target.value)} className="mt-4 w-full h-11 px-3 rounded-sm border hairline bg-background">
                <option value="">Choose pickup zone…</option>
                {zones?.map((z) => <option key={z.id} value={z.id}>{z.name} — {formatPrice(z.price)}</option>)}
              </select>
              <Input value={pickupUrl} onChange={(e) => setPickupUrl(e.target.value)} placeholder="Paste your hotel's Google Maps URL…" className="mt-3 rounded-sm" />
            </div>
          )}

          <div className="border hairline rounded-sm p-6">
            <h3 className="font-display text-xl">Promo code</h3>
            <div className="mt-4 flex gap-2">
              <Input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="CERCLE15" className="rounded-sm" />
              <Button variant="outline" onClick={applyPromo} className="rounded-sm">Apply</Button>
            </div>
            {discount > 0 && <p className="mt-3 text-sm text-accent inline-flex items-center gap-2"><Check className="h-3.5 w-3.5" /> {discount}% applied</p>}
          </div>

          <div className="border hairline rounded-sm p-6">
            <h3 className="font-display text-xl">Payment method</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {(["VISA", "CASH"] as const).map((m) => (
                <button key={m} onClick={() => setMethod(m)} className={`p-4 rounded-sm border text-left transition-colors ${method === m ? "border-foreground" : "border-hairline"}`}>
                  <p className="font-display text-lg">{m === "VISA" ? "Card" : "Cash on arrival"}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 surface-elevated border hairline rounded-sm p-6 shadow-soft">
            <img src={pkg.imageUrl} alt="" className="aspect-[4/3] w-full object-cover rounded-sm" />
            <h3 className="mt-5 font-display text-xl">{pkg.title}</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="ink-muted">Package</dt><dd className="tabular-nums">{formatPrice(pkg.price)}</dd></div>
              {transport > 0 && <div className="flex justify-between"><dt className="ink-muted">Transport · {zone?.name}</dt><dd className="tabular-nums">{formatPrice(transport)}</dd></div>}
              {discount > 0 && <div className="flex justify-between text-accent"><dt>Discount ({discount}%)</dt><dd className="tabular-nums">−{formatPrice(subtotal - total)}</dd></div>}
            </dl>
            <div className="mt-5 pt-5 border-t hairline flex justify-between items-baseline">
              <span className="text-sm ink-muted">Total</span>
              <span className="font-display text-3xl tabular-nums">{formatPrice(total)}</span>
            </div>
            <Button size="lg" disabled={submitting} onClick={submit} className="mt-6 w-full rounded-sm">
              <Lock className="mr-2 h-4 w-4" /> {submitting ? "Processing…" : `Pay ${formatPrice(total)}`}
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
