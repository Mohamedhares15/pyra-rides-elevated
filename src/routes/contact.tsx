import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api/client";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — PyraRides" }, { name: "description", content: "Get in touch with our team in Cairo." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await api.submitContact({ name, email, message });
    toast.success("Message sent. We reply within 24 hours.");
    setName(""); setEmail(""); setMessage("");
    setSubmitting(false);
  };
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Reveal>
          <p className="text-[11px] tracking-luxury uppercase ink-muted">Contact</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">Let's talk.</h1>
          <p className="mt-6 text-base ink-soft leading-relaxed max-w-md">For booking questions, our team usually replies within an hour. For partnerships, within a day.</p>
          <div className="mt-10 space-y-5 text-sm">
            <p className="inline-flex items-center gap-3"><Mail className="h-4 w-4 ink-muted" /> hello@pyrarides.com</p>
            <p className="inline-flex items-center gap-3"><MessageCircle className="h-4 w-4 ink-muted" /> WhatsApp: +20 100 000 0000</p>
          </div>
        </Reveal>
        <Reveal>
          <form onSubmit={submit} className="space-y-4 border hairline rounded-sm p-8 surface-elevated">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="rounded-sm" />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-sm" />
            <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} className="rounded-sm" />
            <Button type="submit" disabled={submitting} className="w-full rounded-sm">{submitting ? "Sending…" : "Send message"}</Button>
          </form>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
