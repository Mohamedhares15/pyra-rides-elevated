import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Lock } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api/client";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/checkout/")({
  head: () => ({ meta: [{ title: "Checkout — PyraRides" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [method, setMethod] = useState<"VISA" | "CASH">("VISA");
  const [submitting, setSubmitting] = useState(false);

  const subtotal = 2400;
  const total = Math.round(subtotal * (1 - discount / 100));

  const applyPromo = async () => {
    const res = await api.validatePromoCode(promo);
    if (res.valid) { setDiscount(res.discountPercent); toast.success(res.message); }
    else { setDiscount(0); toast.error(res.message); }
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      await api.createBooking({});
      toast.success("Booking confirmed.");
      navigate({ to: "/payment/success" });
    } catch {
      toast.error("Something went wrong.");
    } finally { setSubmitting(false); }
  };

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          <Reveal>
            <p className="text-[11px] tracking-luxury uppercase ink-muted">Checkout</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl">Confirm your ride.</h1>
          </Reveal>

          <div className="border hairline rounded-sm p-6">
            <h3 className="font-display text-xl">Promo code</h3>
            <div className="mt-4 flex gap-2">
              <Input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="WELCOME10" className="rounded-sm" />
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
                  <p className="text-xs ink-muted mt-1">{m === "VISA" ? "Visa, Mastercard via Paymob" : "Pay at the stable"}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 surface-elevated border hairline rounded-sm p-6 shadow-soft">
            <h3 className="font-display text-xl">Order summary</h3>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="ink-muted">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
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
