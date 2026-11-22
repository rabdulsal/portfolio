"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogShell from "@/components/custom/BlogShell";
import { WavesBackdrop, Panel, Card, Notice } from "@/components/custom/surfaces";
import {
  inputCls,
  labelCls,
  flexBtnCls as buttonCls,
  ghostBtnCls as saveBtnCls,
} from "@/components/custom/fields";

type Answers = { q1: string; q2: string; q3: string; q4: string; q5: string };
const EMPTY: Answers = { q1: "", q2: "", q3: "", q4: "", q5: "" };

type Phase = "loading" | "invalid" | "form" | "done";

const INCLUDES = [
  "Your questions, pressure-tested against ten years of production software.",
  "Direct answers, including when I am the wrong person for the work.",
  "Written next steps after the call.",
  "A scoped written proposal if a project fits.",
];

export default function IntakePage() {
  const [token, setToken] = useState("");
  const [phase, setPhase] = useState<Phase>("loading");
  const [firstName, setFirstName] = useState("");
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [hadSaved, setHadSaved] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState<"save" | "submit" | null>(null);
  const [notice, setNotice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("t") || "";
    if (!t) {
      setPhase("invalid");
      return;
    }
    setToken(t);
    (async () => {
      try {
        const res = await fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: t, mode: "load" }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) {
          setPhase("invalid");
          return;
        }
        const full = String(data.name || "").trim();
        setFirstName(full ? full.split(" ")[0] : "");
        if (data.saved) {
          setAnswers({
            q1: data.saved.q1 || "",
            q2: data.saved.q2 || "",
            q3: data.saved.q3 || "",
            q4: data.saved.q4 || "",
            q5: data.saved.q5 || "",
          });
          setHadSaved(true);
          if (data.saved.status === "submitted") setAlreadySubmitted(true);
        }
        setPhase("form");
      } catch {
        setPhase("invalid");
      }
    })();
  }, []);

  const set =
    (key: keyof Answers) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setAnswers((a) => ({ ...a, [key]: e.target.value }));

  async function send(mode: "save" | "submit") {
    if (busy) return;
    setBusy(mode);
    setErrorMsg("");
    setNotice("");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, mode, website, answers }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
      if (mode === "submit") {
        setAlreadySubmitted(true);
        setEditing(false);
        setPhase("done");
      } else {
        setHadSaved(true);
        setNotice(
          "Saved. This same link brings you back any time before our call. Finish later, or change anything."
        );
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong. Try again.");
    } finally {
      setBusy(null);
    }
  }

  const showDone = phase === "done" || (alreadySubmitted && !editing);

  return (
    <BlogShell>
      <WavesBackdrop image="/images/aeo-circles.jpg" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left: explanation in the shared solid Panel over the waves backdrop */}
          <Panel>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-orange">
              Advisory hour · Session setup
            </p>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight md:text-5xl">
              {firstName ? `Welcome, ${firstName}.` : "Your hour is booked."}
            </h1>
            <div className="mb-8 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  One paid hour, spent on your decision. The questions on this page
                  take about ten minutes. Your answers land in my notes before we
                  meet, and we open with your words.
                </p>
                <p>
                  Short answers are fine. If a question stumps you, write that. It
                  tells me where to dig in live.
                </p>
              </div>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                What the hour includes
              </h2>
              <ul className="mb-8 space-y-2.5 text-sm leading-relaxed">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-orange">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-foreground/10 pt-5 text-sm leading-relaxed text-muted-foreground">
                One term worth repeating: the $99 fee counts toward your first
                project when we start within 30 days.
              </p>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                New here? The free guide on{" "}
                <Link
                  href="/aeo"
                  className="text-orange underline underline-offset-4"
                >
                  what customers hear when they ask AI about your business
                </Link>{" "}
                takes five minutes.
              </p>
          </Panel>

          {/* Right: the form in the shared translucent Card over the backdrop */}
          <div className="lg:sticky lg:top-24">
            <Card>
            {phase === "loading" && (
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-orange">
                  Session setup
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Opening your session page...
                </p>
              </div>
            )}

            {phase === "invalid" && (
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-orange">
                  Session setup
                </p>
                <h2 className="mb-3 font-display text-2xl font-bold">
                  This link has expired
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Intake links work for 30 days after a booking, and they open only
                  from the exact link in your welcome email. If you booked and paid,
                  reply to that email and I will send a fresh link.
                </p>
                <Link
                  href="/book"
                  className="font-mono text-xs uppercase tracking-widest text-orange hover:text-white"
                >
                  Book the advisory hour →
                </Link>
              </div>
            )}

            {(phase === "form" || phase === "done") && showDone && (
              <Notice>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-orange">
                  Answers in
                </p>
                <h2 className="mb-3 font-display text-2xl font-bold">
                  We open with your words.
                </h2>
                <p className="text-sm leading-relaxed">
                  Your answers are in my notes for our session. I read them before
                  we meet and build the hour around your decision. If the picture
                  changes before the call, come back on this same link and update
                  them.
                </p>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-orange"
                >
                  Update my answers
                </button>
              </Notice>
            )}

            {(phase === "form" || phase === "done") && !showDone && (
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-orange">
                  Session setup
                </p>
                <h2 className="mb-2 font-display text-2xl font-bold">
                  Five questions before we talk
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {hadSaved
                    ? "You have answers saved. Pick up where you left off, then send."
                    : "Ten minutes. I read everything sent ahead. Save partway and finish later if you need to."}
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send("submit");
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="intake-q1" className={labelCls}>
                      1 · The decision you are facing, in your own words
                    </label>
                    <textarea
                      id="intake-q1"
                      rows={4}
                      value={answers.q1}
                      onChange={set("q1")}
                      className={inputCls}
                      placeholder="The choice in front of you, as you see it today"
                    />
                  </div>
                  <div>
                    <label htmlFor="intake-q2" className={labelCls}>
                      2 · Any links or numbers that bear on it
                    </label>
                    <textarea
                      id="intake-q2"
                      rows={3}
                      value={answers.q2}
                      onChange={set("q2")}
                      className={inputCls}
                      placeholder="Links, figures, documents. Paste what you have"
                    />
                  </div>
                  <div>
                    <label htmlFor="intake-q3" className={labelCls}>
                      3 · What outcome would make this hour worth it?
                    </label>
                    <textarea
                      id="intake-q3"
                      rows={3}
                      value={answers.q3}
                      onChange={set("q3")}
                      className={inputCls}
                      placeholder="What you want in hand when the hour ends"
                    />
                  </div>
                  <div>
                    <label htmlFor="intake-q4" className={labelCls}>
                      4 · Your budget range for the fix, if we find it together
                    </label>
                    <input
                      id="intake-q4"
                      type="text"
                      value={answers.q4}
                      onChange={set("q4")}
                      className={inputCls}
                      placeholder="A range is fine, or: not sure yet"
                    />
                  </div>
                  <div>
                    <label htmlFor="intake-q5" className={labelCls}>
                      5 · Who else needs to say yes before work starts?
                    </label>
                    <input
                      id="intake-q5"
                      type="text"
                      value={answers.q5}
                      onChange={set("q5")}
                      className={inputCls}
                      placeholder="Names or roles, or: just me"
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
                  {notice && <p className="text-sm text-orange">{notice}</p>}
                  {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
                  <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => send("save")}
                      disabled={busy !== null}
                      className={saveBtnCls}
                    >
                      {busy === "save" ? "Saving..." : "Save and finish later"}
                    </button>
                    <button type="submit" disabled={busy !== null} className={buttonCls}>
                      {busy === "submit" ? "Sending..." : "Send my answers"}
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Your answers go to Rashad only, ahead of our session. Nothing
                    here is shared or added to a list.
                  </p>
                </form>
              </div>
            )}
            </Card>
          </div>
        </div>
      </div>
    </BlogShell>
  );
}
