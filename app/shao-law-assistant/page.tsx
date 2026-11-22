import type { Metadata } from "next";
import Link from "next/link";
import BlogShell from "@/components/custom/BlogShell";

export const metadata: Metadata = {
  title: "Program Your Own Assistant | Shao Law",
  description:
    "How Jath Shao sets up his own personal AI assistant: the steps, the starter prompt, and the rules it works under.",
  robots: { index: false, follow: false },
};

const HIGHLIGHTS = [
  {
    label: "Who you are",
    lines:
      "You are my personal assistant. I am Jath Shao, immigration attorney. My practice is Zoom-first, based in Miami, and I am an immigrant myself.",
  },
  {
    label: "What comes first",
    lines:
      "My first priority is removal defense for Spanish-speaking clients. If you see a date or a deadline anywhere, flag it to me the moment you see it.",
  },
  {
    label: "How you talk to people",
    lines:
      "People ask for free legal advice every day. Never give it. Steer them to book a paid consultation, politely and briefly.",
  },
  {
    label: "A hard rule",
    lines:
      "Never promise an outcome in anything you draft. You draft, I review, I decide. The legal judgment is mine alone.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Join from the invite",
    body: "Rashad sends you his invite link. Join Muse under your own account and redeem the code within 48 hours: on mobile, Settings, then Redeem token; on the web, Settings, General, Usage, then Redeem invite code. Your assistant lives on your account. It cannot be built by someone else and handed over, which is exactly why it stays private to you.",
  },
  {
    n: "2",
    title: "Give it a name",
    body: "Pick a name you like saying out loud. You will talk to this assistant daily, in voice as much as text. We choose the name together in about a minute.",
  },
  {
    n: "3",
    title: "Write the starter prompt together",
    body: "In the meeting we write its first briefing together: who you are, what the practice is, what it is for, and the rules it never breaks. The examples further down show the shape of it. Once written, it works for your practice, not a generic one.",
  },
  {
    n: "4",
    title: "Connect your tools",
    body: "If you are willing, connect your business Gmail and Calendar. That is when it gets useful fast: it can read the inbox with you, watch deadlines, and prep you before consults. Your call, and it can wait.",
  },
  {
    n: "5",
    title: "Run one real test together",
    body: "Before we leave the meeting, we do one real piece of work with it, your next week of consults, planned out loud. You should feel the value in the room, not take my word for it.",
  },
];

const TEACHING = [
  {
    title: "Correct it out loud",
    body: "When it gets something wrong, say so, and say what right looks like. It remembers. Every correction makes the next draft sound more like you.",
  },
  {
    title: "Feed it your voice",
    body: "Paste in emails and letters you are proud of. It learns your tone from your best work faster than from any instruction.",
  },
  {
    title: "Give it your rules as you make them",
    body: "Decide once that consults are never free, or that Venezuelan removal cases get priority, and tell it. A rule stated once becomes a rule applied always.",
  },
  {
    title: "Keep client facts minimal",
    body: "Work with initials and case types where you can. The assistant needs the shape of a matter to help you think; it rarely needs a full name attached.",
  },
];

const GOOD_JOBS = [
  "Summarize a long intake email into the three things you must decide",
  "Draft a document checklist for a new case type",
  "Draft a reply to a client email, for your approval",
  "Prep you for a consultation: likely questions, documents to have open",
  "Brainstorm marketing angles for one practice area",
  "Turn your voice notes after a hearing into a clean task list",
];

const NEVER_JOBS = [
  "Answering a client's legal question, in any channel",
  "Sending or publishing anything without your review",
  "Tracking a filing deadline on its own, without flagging it to you",
  "Promising an outcome, in writing or out loud",
];

export default function ShaoLawAssistantPage() {
  return (
    <BlogShell>
      <main className="mx-auto max-w-3xl px-6 pt-12 pb-20">
        <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
          Desk Agent · For Shao Law
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
          Program your own personal assistant
        </h1>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Jath, part of your engagement includes an AI assistant of your own,
          set up on your own account and briefed on your practice. Think of it
          as a chief of staff that never sleeps: it drafts, summarizes,
          organizes, and keeps your week in front of you. This page is the
          instruction sheet. We do the setup together in our meeting, in about
          ten minutes, and you leave with it already working.
        </p>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          One thing to know up front: an assistant like this cannot be built by
          someone else and gifted to you. It has to be yours, on your account,
          learning from you. That is a feature. Your clients, your judgment,
          your data stay with you.
        </p>

        <section className="mt-12">
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
            The setup, step by step
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {STEPS.map((step) => (
              <div key={step.n} className="rounded-xl border border-white/10 p-5">
                <p className="font-display text-2xl font-semibold text-orange">{step.n}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-white/10 p-6">
          <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
            From step 3
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white">What goes inside a starter prompt</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            A starter prompt is just a page of plain instructions, written in
            your own words. Below are the kinds of lines yours will carry, as
            examples. We write the real one together during setup, and it stays
            yours: you can read it, change it, and add to it whenever you like.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="font-mono text-[11px] tracking-widest uppercase text-orange">{h.label}</p>
                <p className="mt-3 font-mono text-[13px] leading-relaxed text-foreground/90">“{h.lines}”</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
            Programming it, week by week
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The starter prompt is day one. After that, you program it the way you
            would train a good hire: by working with it and correcting it.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {TEACHING.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 p-5">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="font-display text-xl font-semibold text-white">Good first jobs for it</h2>
            <ul className="mt-4 space-y-3">
              {GOOD_JOBS.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="font-display text-xl font-semibold text-white">Jobs it must never do</h2>
            <ul className="mt-4 space-y-3">
              {NEVER_JOBS.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-white/10 p-6">
          <h2 className="font-display text-2xl font-semibold text-white">We set it up together</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            You do not need to do any of this alone before the meeting. Bring
            your phone or laptop, and we walk the five steps in about ten
            minutes, ending with one real piece of work so you can judge it
            yourself. The full engagement this belongs to is on the{" "}
            <Link href="/shao-law-proposal" className="text-orange underline underline-offset-4">
              proposal page
            </Link>
            .
          </p>
        </section>
      </main>
    </BlogShell>
  );
}
