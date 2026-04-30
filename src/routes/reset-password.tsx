import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set new password — PyraRides" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [pw, setPw] = useState(""); const [pw2, setPw2] = useState("");
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24 max-w-md">
        <p className="text-[11px] tracking-luxury uppercase ink-muted">Reset password</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Set a new one.</h1>
        <form onSubmit={(e) => { e.preventDefault(); if (pw !== pw2) return toast.error("Passwords don't match."); toast.success("Password updated."); }} className="mt-8 space-y-4">
          <Input type="password" placeholder="New password" value={pw} onChange={(e) => setPw(e.target.value)} required className="rounded-sm" />
          <Input type="password" placeholder="Confirm" value={pw2} onChange={(e) => setPw2(e.target.value)} required className="rounded-sm" />
          <Button type="submit" className="w-full rounded-sm">Update password</Button>
        </form>
        <p className="mt-6 text-sm ink-soft"><Link to="/signin" className="border-b hairline pb-0.5">Back to sign in</Link></p>
      </section>
    </SiteLayout>
  );
}
