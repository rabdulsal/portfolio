import type { Metadata } from "next";
import type { ReactNode } from "react";
import BlogShell from "@/components/custom/BlogShell";

export const metadata: Metadata = {
  title: "Your First Four Weeks | Shao Law",
  description:
    "What the first four weeks of the Desk Agent engagement look like for Shao Law, week by week, once account access is in place.",
  robots: { index: false, follow: false },
};

function IconMap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
      <circle cx="12" cy="11" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconInbox() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M3 13 5.5 5h13L21 13v6a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19v-6Z" />
      <path d="M3 13h5l1.2 2.2a1.6 1.6 0 0 0 1.4.8h2.8a1.6 1.6 0 0 0 1.4-.8L16 13h5" />
    </svg>
  );
}

function IconChecklist() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M9 6h11" />
      <path d="M9 12h11" />
      <path d="M9 18h11" />
      <path d="m3.5 6 1.2 1.2L7 4.9" />
      <path d="m3.5 12 1.2 1.2L7 10.9" />
      <path d="m3.5 18 1.2 1.2L7 16.9" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M4 4v15.5h16" />
      <path d="m7.5 14.5 3.8-4 3 2.4 4.2-5" />
      <path d="M15.6 7.7h3v3" />
    </svg>
  );
}

const WEEKS: { title: string; icon: ReactNode; points: string[] }[] = [
  {
    title: "Week 1 · Map and audit",
    icon: <IconMap />,
    points: [
      "Every account reviewed: booking, payments, inbox, files",
      "Your client path mapped, first contact to complete file",
      "Gaps found and written down",
      "Starting numbers recorded, so progress is measured honestly",
      "Anything missing gets flagged this week",
    ],
  },
  {
    title: "Week 2 · The inbox",
    icon: <IconInbox />,
    points: [
      "Gmail sorted into clear buckets, nothing buried",
      "Auto-reply drafts to you first, you approve every word",
      "Replies never give legal advice",
      "Free-advice seekers steered to the paid booking",
      "Documents and deadlines flagged straight to you",
    ],
  },
  {
    title: "Week 3 · Client files",
    icon: <IconChecklist />,
    points: [
      "One Drive folder per client, one standard structure",
      "A document checklist for each case type",
      "Checklist tracked to 100% before the file reaches you",
      "You review complete files, no chasing paperwork",
    ],
  },
  {
    title: "Week 4 · Booking flow and measurement",
    icon: <IconChart />,
    points: [
      "Booking to paid consultation, tightened end to end",
      "Analytics live on shao.law",
      "The number that counts: booked paid consults",
      "Four-week review together on our call",
      "Your call on the second block",
    ],
  },
];

const FROM_YOU = [
  "About an hour a week for our working session. That call is how this stays steered.",
  "Quick approvals when I send you wording to review. Nothing client-facing goes live without your sign-off.",
  "Everything else runs in the background.",
];

export default function ShaoLawNextStepsPage() {
  return (
    <BlogShell>
      <main className="mx-auto max-w-3xl px-6 pt-12 pb-20">
        <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
          Desk Agent · Next steps for Shao Law
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
          Your first four weeks
        </h1>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Jath, now that access is on its way, here is how the first four weeks
          run, at a glance. One working session a week, and you will always
          know what is done, what is next, and what I need from you.
        </p>

        <section className="mt-12 space-y-4">
          {WEEKS.map((week) => (
            <div
              key={week.title}
              className="rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange/40 text-orange">
                  {week.icon}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">
                  {week.title}
                </h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {week.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-xl border border-white/10 p-6">
          <h2 className="font-display text-2xl font-semibold text-white">
            If something is missing, that is fine
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            You do not need to have everything on the access list. If there is
            no Google Business Profile for one of your locations yet, no
            analytics on the site, or no Zapier account, I will set it up
            under your name, on your accounts, billed to the practice. Part of
            this job is building the pieces that are not there yet.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-white/10 p-6">
          <h2 className="font-display text-2xl font-semibold text-white">
            What I need from you each week
          </h2>
          <ul className="mt-4 space-y-3">
            {FROM_YOU.map((line) => (
              <li
                key={line}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            That is the whole picture for the first block. The proposal page
            has the full eight weeks whenever you want to look ahead.
          </p>
        </section>
      </main>
    </BlogShell>
  );
}
