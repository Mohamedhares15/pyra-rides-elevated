import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — PyraRides" }] }),
  component: SignUpPage,
});

function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({ fullName: "", email: "", phoneNumber: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true);
    try { await signUp(data); toast.success("Account created."); navigate({ to: "/" }); }
    finally { setSubmitting(false); }
  };
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24 max-w-md">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Create account</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">Begin riding.</h1>
          <form onSubmit={submit} className="mt-10 space-y-4">
            <Input value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} placeholder="Full name" className="rounded-sm" required />
            <Input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" className="rounded-sm" required />
            <Input value={data.phoneNumber} onChange={(e) => setData({ ...data, phoneNumber: e.target.value })} placeholder="Phone (optional)" className="rounded-sm" />
            <Input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" className="rounded-sm" required />
            <Button type="submit" disabled={submitting} className="w-full rounded-sm">{submitting ? "Creating…" : "Create account"}</Button>
          </form>
          <p className="mt-6 text-sm ink-soft">Already have an account? <Link to="/signin" className="border-b hairline pb-0.5">Sign in</Link></p>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
