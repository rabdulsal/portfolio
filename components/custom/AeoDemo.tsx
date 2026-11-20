"use client";

import { useState } from "react";

const inputCls =
  "w-full px-3 py-2.5 rounded-md bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-orange/60 focus:border-orange/60";
const labelCls =
  "block font-mono text-[11px] tracking-widest uppercase text-muted-foreground mb-1.5";
const buttonCls =
  "w-full py-3 rounded-md bg-orange text-white font-mono text-sm tracking-widest uppercase hover:bg-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
const linkBtnCls =
  "mt-4 font-mono text-[11px] tracking-widest uppercase text-muted-foreground hover:text-orange transition-colors";

type Phase = "idle" | "running" | "teaser" | "unlocking" | "sent";

export default function AeoDemo() {
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [teaser, setTeaser] = useState("");
  const [observation, setObservation] = useState("");
  const [token, setToken] = useState("");
  const [askedOn, setAskedOn] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const canRun = company.trim().length > 1 && phase !== "running";
  const canUnlock =
    name.trim().length > 1 && /.+@.+\..+/.test(email) && phase !== "unlocking";

  async function handleRun(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canRun) return;
    setPhase("running");
    setErrorMsg("");
    try {
      const res = await fetch("/api/aeo-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "run", company, city, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
      setTeaser(data.teaser || "");
      setObservation(data.observation || "");
      setToken(data.token || "");
      setAskedOn(
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      setPhase("teaser");
    } catch (err: any) {
      setPhase("idle");
      setErrorMsg(err?.message || "Something went wrong. Try again.");
    }
  }

  async function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canUnlock) return;
    setPhase("unlocking");
    setErrorMsg("");
    try {
      const res = await fetch("/api/aeo-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unlock", token, name, email, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
      setPhase("sent");
    } catch (err: any) {
      setPhase("teaser");
      setErrorMsg(err?.message || "Something went wrong. Try again.");
    }
  }

  function reset() {
    setPhase("idle");
    setErrorMsg("");
    setTeaser("");
    setObservation("");
    setToken("");
  }

  if (phase === "sent") {
    return (
      <div className="rounded-lg border border-orange/30 bg-orange/5 p-5">
        <p className="font-mono text-xs text-orange tracking-widest uppercase mb-2">
          Report sent
        </p>
        <p className="text-sm leading-relaxed">
          The full answer is on its way to <span className="text-white">{email}</span>.
          Read it word for word when it lands. What it leaves out is the story. The free
          guide is linked at the bottom of the same email.
        </p>
        <button type="button" onClick={reset} className={linkBtnCls}>
          Check another business
        </button>
      </div>
    );
  }

  if (phase === "teaser" || phase === "unlocking") {
    return (
      <div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-5 mb-5">
          <p className="font-mono text-[11px] text-orange tracking-widest uppercase mb-2">
            Perplexity · {askedOn}
          </p>
          <p className="text-sm leading-relaxed">{teaser}</p>
          <p className="mt-3 border-t border-white/10 pt-3 text-sm font-medium">
            {observation}
          </p>
        </div>
        <h3 className="font-display text-lg font-semibold mb-1">Get the full answer</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The complete answer, word for word, with the sources it pulled from. Sent to
          your inbox, free.
        </p>
        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <label htmlFor="demo-name" className={labelCls}>
              Name *
            </label>
            <input
              id="demo-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="demo-email" className={labelCls}>
              Email *
            </label>
            <input
              id="demo-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="you@yourbusiness.com"
            />
          </div>
          <div>
            <label htmlFor="demo-phone" className={labelCls}>
              Phone (optional)
            </label>
            <input
              id="demo-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputCls}
              placeholder="Business phone"
            />
          </div>
          {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
          <button type="submit" disabled={!canUnlock} className={buttonCls}>
            {phase === "unlocking" ? "Sending..." : "Email me the full report"}
          </button>
        </form>
        <button type="button" onClick={reset} className={linkBtnCls}>
          Start over
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleRun} className="space-y-4">
      <div>
        <label htmlFor="demo-company" className={labelCls}>
          Company name *
        </label>
        <input
          id="demo-company"
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputCls}
          placeholder="Your business name"
        />
      </div>
      <div>
        <label htmlFor="demo-city" className={labelCls}>
          City (optional)
        </label>
        <input
          id="demo-city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputCls}
          placeholder="City and state"
        />
      </div>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>
      {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
      <button type="submit" disabled={!canRun} className={buttonCls}>
        {phase === "running" ? "Asking the AI..." : "Ask the AI"}
      </button>
      {phase === "running" && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          Asking about {company.trim()} now. A live answer takes a few seconds.
        </p>
      )}
      <p className="text-xs text-muted-foreground leading-relaxed">
        One real question, asked live. You see the start of the answer here. The full
        answer goes by email.
      </p>
    </form>
  );
}
