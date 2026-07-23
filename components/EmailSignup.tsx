"use client";

import { useState } from "react";

/**
 * Email list signup form.
 *
 * ENGINEERING HANDOFF NOTES
 * - Wire the TODO in handleSubmit to the real email list provider (POST the
 *   address to an API route / Mailchimp / Resend audience / etc.).
 * - The submitted state is purely optimistic right now; surface provider
 *   errors there once it's connected.
 */
export function EmailSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(backend): send `email` to the mailing list provider here.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 text-cream ${className ?? ""}`}>
        <pre aria-hidden className="font-mono text-[9px] leading-[1.15]">{"\\ | /\n-(*)-\n/ | \\"}</pre>
        <span className="font-mono text-[14px] tracking-[0.06em]">
          You&rsquo;re on the list. See you in October.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-[520px] gap-3 ${className ?? ""}`}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@school.edu"
        data-cursor="hover"
        className="min-w-0 flex-1 rounded-pill border border-white/50 bg-[rgba(29,36,18,0.38)] px-5 py-3.5 text-[15px] text-cream outline-none transition-colors placeholder:text-cream/70 focus:border-cream focus:bg-[rgba(29,36,18,0.5)]"
      />
      <button
        type="submit"
        data-cursor="hover"
        className="shrink-0 rounded-pill bg-cream px-7 py-3.5 text-[15px] font-medium text-moss-900 transition-colors hover:bg-white"
      >
        Subscribe
      </button>
    </form>
  );
}
