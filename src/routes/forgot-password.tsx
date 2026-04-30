import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — PyraRides" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24 max-w-md">
        <p className="text-[11px] tracking-luxury uppercase ink-muted">Reset password</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Forgot it?</h1>
        <p className="mt-3 text-sm ink-soft">Enter your email — we'll send a reset link.</p>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Reset link sent."); }} className="mt-8 space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-sm" />
          <Button type="submit" className="w-full rounded-sm">Send reset link</Button>
        </form>
        <p className="mt-6 text-sm ink-soft"><Link to="/signin" className="border-b hairline pb-0.5">Back to sign in</Link></p>
      </section>
    </SiteLayout>
  );
}
