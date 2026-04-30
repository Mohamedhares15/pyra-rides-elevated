import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/signin")({
  head: () => ({ meta: [{ title: "Sign in — PyraRides" }] }),
  component: SignInPage,
});

function SignInPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("rider@pyrarides.com");
  const [password, setPassword] = useState("password");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true);
    try { await signIn(identifier, password); toast.success("Welcome back."); navigate({ to: "/" }); }
    finally { setSubmitting(false); }
  };
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24 max-w-md">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Sign in</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">Welcome back.</h1>
          <form onSubmit={submit} className="mt-10 space-y-4">
            <Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Email or phone" className="rounded-sm" required />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-sm" required />
            <Button type="submit" disabled={submitting} className="w-full rounded-sm">{submitting ? "Signing in…" : "Sign in"}</Button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="ink-soft border-b hairline pb-0.5">Forgot password</Link>
            <Link to="/signup" className="ink-soft border-b hairline pb-0.5">Create account</Link>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
