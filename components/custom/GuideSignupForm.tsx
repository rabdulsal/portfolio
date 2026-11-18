"use client";

import { useState } from "react";

const inputCls =
  "w-full px-3 py-2.5 rounded-md bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-orange/60 focus:border-orange/60";
const labelCls =
  "block font-mono text-[11px] tracking-widest uppercase text-muted-foreground mb-1.5";

export default function GuideSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = name.trim().length > 1 && /.+@.+\..+/.test(email) && status !== "sending";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/guide-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, business, phone, interest }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
      setStatus("sent");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-orange/30 bg-orange/5 p-5">
        <p className="font-mono text-xs text-orange tracking-widest uppercase mb-2">
          One more step
        </p>
        <p className="text-sm leading-relaxed">
          I sent a confirmation link to <span className="text-white">{email}</span>. Click it
          and the guide lands in your inbox. If it is not in your main inbox, check Promotions
          or Spam and drag it over.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="guide-name" className={labelCls}>
          Name *
        </label>
        <input
          id="guide-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="guide-email" className={labelCls}>
          Email *
        </label>
        <input
          id="guide-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="you@yourbusiness.com"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="guide-business" className={labelCls}>
            Business (optional)
          </label>
          <input
            id="guide-business"
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            className={inputCls}
            placeholder="Practice or company"
          />
        </div>
        <div>
          <label htmlFor="guide-phone" className={labelCls}>
            Phone (optional)
          </label>
          <input
            id="guide-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
            placeholder="Business phone"
          />
        </div>
      </div>
      <div>
        <label htmlFor="guide-interest" className={labelCls}>
          What brought you here? (optional)
        </label>
        <textarea
          id="guide-interest"
          rows={3}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className={inputCls}
          placeholder="Curious about AI search, losing calls, want more booked appointments..."
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3 rounded-md bg-orange text-white font-mono text-sm tracking-widest uppercase hover:bg-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send me the guide"}
      </button>
      <p className="text-xs text-muted-foreground leading-relaxed">
        One confirmation email, then the guide. No list, no spam. I reply personally to every
        signup.
      </p>
    </form>
  );
}
