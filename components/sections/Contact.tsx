"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { CONTACT, SITE } from "@/lib/content";
import { useReveal } from "@/lib/anim";

type Status = "idle" | "submitting" | "done";

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Tell us your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "We need an email to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email doesn't look right.";
    if (!String(data.get("message") ?? "").trim())
      next.message = "Add a short message.";

    setErrors(next);
    if (Object.keys(next).length) return;

    // Design-first: mock the submit. Wire to a real endpoint later.
    setStatus("submitting");
    setTimeout(() => setStatus("done"), 1100);
  }

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(230,184,76,0.16), transparent 65%)" }}
      />

      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Left: pitch */}
        <div className="flex flex-col justify-center">
          <SectionHeading index="07" kicker={CONTACT.kicker} />
          <h2 className="reveal display mt-7 text-5xl text-ivory sm:text-6xl lg:text-7xl">
            {CONTACT.headline}
          </h2>
          <p className="reveal mt-6 max-w-md text-base leading-relaxed text-ivory/70">
            {CONTACT.body}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="reveal link-sweep mt-8 inline-block w-fit font-display text-xl font-bold text-gold sm:text-2xl"
          >
            {SITE.email}
          </a>
          <p className="reveal mt-6 flex items-center gap-2 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {SITE.location} · {SITE.country}
          </p>
        </div>

        {/* Right: form */}
        <div className="reveal rounded-2xl border border-line bg-bg-raise/50 p-6 backdrop-blur-sm sm:p-9">
          {status === "done" ? (
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
              <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-bg">
                <Check className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="display text-3xl text-ivory">Message sent.</h3>
              <p className="mt-3 max-w-xs text-sm text-ivory/60">
                Thank you — we&apos;ll be in touch soon. The journey begins at
                home, but it never stays there.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <Field
                label="Name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                error={errors.email}
              />

              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="label text-muted">
                  I am a
                </label>
                <select
                  id="role"
                  name="role"
                  defaultValue="Artist"
                  className="rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
                >
                  <option>Artist</option>
                  <option>Partner / Brand</option>
                  <option>Press</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="label text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us your sound…"
                  aria-invalid={!!errors.message}
                  className={`resize-none rounded-lg border bg-bg px-4 py-3 text-sm text-ivory outline-none transition-colors placeholder:text-muted/60 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 ${
                    errors.message ? "border-red-400/70" : "border-line"
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition-transform hover:scale-[1.02] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    {CONTACT.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="label text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`rounded-lg border bg-bg px-4 py-3 text-sm text-ivory outline-none transition-colors placeholder:text-muted/60 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 ${
          error ? "border-red-400/70" : "border-line"
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
