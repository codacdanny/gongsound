"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { CONTACT, SITE } from "@/lib/content";
import { useReveal } from "@/lib/anim";
import SoundWave from "@/components/SoundWave";

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

    setStatus("submitting");
    setTimeout(() => setStatus("done"), 1100);
  }

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-32 sm:py-48">
      {/* Massive gold radial glow — capped on mobile to avoid GPU memory crashes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/4 left-1/2 -z-10 h-[60vh] w-[100vw] -translate-x-1/2 rounded-full opacity-60 md:h-[140vh] md:w-[140vw] md:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(230,184,76,0.25), rgba(169,120,28,0.08), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Hero-scale headline */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center px-2">
          <div className="reveal inline-block mb-4 sm:mb-6">
            <span className="label text-gold text-xs sm:text-sm">Let's build something</span>
          </div>
          <h2 className="reveal display text-3xl sm:text-5xl lg:text-7xl xl:text-8xl text-balance leading-[0.9]">
            <span className="text-gold-sheen">Legendary.</span>
          </h2>
          <p className="reveal mt-6 sm:mt-8 mx-auto max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-ivory/70">
            {CONTACT.body}
          </p>
        </div>

        {/* Soundwave accent */}
        <div className="reveal mx-auto mb-12 sm:mb-16 lg:mb-20 h-12 sm:h-16 lg:h-20 max-w-3xl">
          <SoundWave bars={96} />
        </div>

        {/* Form + contact info grid */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          {/* Form */}
          <div className="reveal min-w-0 rounded-2xl border border-gold/40 bg-gradient-to-b from-bg-raise/60 to-bg/40 p-5 sm:p-8 lg:p-12 backdrop-blur-xl">
            {status === "done" ? (
              <div className="flex h-full min-h-[24rem] sm:min-h-[32rem] flex-col items-center justify-center text-center">
                <span className="mb-4 sm:mb-5 flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center rounded-full bg-gold text-bg">
                  <Check className="h-8 sm:h-10 w-8 sm:w-10" aria-hidden />
                </span>
                <h3 className="display text-2xl sm:text-4xl text-ivory">Message sent.</h3>
                <p className="mt-3 sm:mt-4 max-w-xs text-sm sm:text-base text-ivory/60">
                  Thank you — we'll be in touch soon. The journey begins at home,
                  but it never stays there.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 sm:gap-6">
                <Field
                  label="Your name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="First and last"
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

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="role" className="label text-muted">
                    I am a
                  </label>
                  <select
                    id="role"
                    name="role"
                    defaultValue="Artist"
                    className="rounded-lg border border-line bg-bg px-4 py-3 sm:py-3.5 text-base text-ivory outline-none transition-colors focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
                  >
                    <option>Artist</option>
                    <option>Partner / Brand</option>
                    <option>Press</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="message" className="label text-muted">
                    Tell us your sound
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="What's on your mind? Ideas, questions, collaboration proposals — we're listening."
                    aria-invalid={!!errors.message}
                    className={`resize-none rounded-lg border bg-bg px-4 py-3 sm:py-3.5 text-base text-ivory outline-none transition-colors placeholder:text-muted/50 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 ${
                      errors.message ? "border-red-400/70" : "border-line"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-gold px-6 sm:px-8 py-3.5 sm:py-4.5 text-sm sm:text-base font-semibold uppercase tracking-[0.16em] text-bg transition-transform hover:scale-[1.05] disabled:scale-100 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    <>
                      {CONTACT.cta}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info + location */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="reveal min-w-0 rounded-2xl border border-gold/30 bg-bg-raise/50 p-5 sm:p-8 backdrop-blur-sm overflow-hidden">
              <p className="label mb-2 sm:mb-4 text-gold text-xs sm:text-sm">Reach us</p>
              <a
                href={`mailto:${SITE.email}`}
                className="reveal link-sweep block font-display text-base sm:text-xl lg:text-2xl font-bold text-gold leading-snug break-all"
              >
                {SITE.email}
              </a>

              <div className="reveal mt-6 sm:mt-8 space-y-4 sm:space-y-6 border-t border-line pt-6 sm:pt-8">
                <div>
                  <p className="label mb-1 sm:mb-2 text-muted">Location</p>
                  <p className="text-base sm:text-lg font-medium text-ivory">
                    {SITE.location}
                  </p>
                  <p className="font-serif text-xs sm:text-sm italic text-gold mt-1">
                    {SITE.country}
                  </p>
                </div>

                <div>
                  <p className="label mb-2 sm:mb-3 text-muted text-xs sm:text-sm">Follow</p>
                  <ul className="flex flex-wrap gap-2">
                    {SITE.social.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          className="rounded-full border border-gold/40 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gold transition-all hover:border-gold hover:bg-gold/10 whitespace-nowrap"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
    <div className="flex flex-col gap-1.5 sm:gap-2">
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
        className={`rounded-lg border bg-bg px-4 py-3 sm:py-3.5 text-base text-ivory outline-none transition-colors placeholder:text-muted/50 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 ${
          error ? "border-red-400/70" : "border-line"
        }`}
      />
      {error && <p className="text-xs sm:text-sm text-red-400">{error}</p>}
    </div>
  );
}
