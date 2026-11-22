import type { Metadata } from "next";
import BlogShell from "@/components/custom/BlogShell";

export const metadata: Metadata = {
  title: "Desk Agent Proposal | Shao Law",
  description:
    "An eight-week back-office engagement for Shao Law, in two blocks: the front door and the inbox, then glue and growth.",
  robots: { index: false, follow: false },
};

const BLOCK_ONE = [
  {
    title: "Booking flow, audited and fixed",
    body: "Your Setmore to payment to Calendly path, checked end to end: the 30-minute intro call and the one-hour full consultation, pay first, contact details revealed after payment. Breaks fixed, dead ends removed.",
  },
  {
    title: "Inbox, sorted and answered",
    body: "Your business inbox gets sorting rules and auto-replies that do one job: steer people asking for free advice to a paid consultation. No legal answers, no long back-and-forth before someone books. Anything carrying documents or a deadline gets flagged to you, never answered by a machine.",
  },
  {
    title: "Client records that stay in order",
    body: "One folder per client in Google Drive, in a standard structure, with a simple tracker on top. Every case in the same place, named the same way, findable in seconds.",
  },
  {
    title: "Document collection without the chasing",
    body: "A checklist for each case type, generated for the client and tracked to complete. The file reaches you at one hundred percent, instead of arriving in pieces across twenty emails.",
  },
  {
    title: "Measurement from day one",
    body: "Analytics on shao.law with the booked paid consultation as the number that counts. We agree the target together: one new client a week. This is how we prove, in numbers, whether the work is hitting it.",
  },
];

const BEFORE_WE_START = [
  "Access to your Google business accounts, Setmore, Calendly, and your site, granted once, up front.",
  "Tool subscriptions (texting, automation) in your practice's name, billed to the practice.",
  "Your approval on the exact wording of every auto-reply before it goes live. Nothing speaks for your firm without your sign-off.",
  "One meeting a week. That call is how this stays steered.",
];

const BLOCK_TWO = [
  {
    title: "The glue: bookings that set themselves up",
    body: "When a consultation is paid and booked, the system creates the client record, the Drive folder, and the document checklist on its own. No manual setup per client, nothing dropped between tools.",
  },
  {
    title: "A receptionist on your Miami number",
    body: "A missed call gets a text back in about a minute, and the conversation steers to a booked, paid consultation. Calls you cannot take stop being clients you never met.",
  },
  {
    title: "Google presence, set up properly",
    body: "Your Google Business Profile claimed, accurate, and complete: categories, services, hours, and the booking link, so people searching for help in Miami find a practice that looks ready.",
  },
  {
    title: "The market push, in your order",
    body: "Spanish-speaking removal defense first, Venezuelan cases at the front. Then Chinese-speaking removal defense, general removal defense, R-1 religious workers, E-2 and EB-5, and marriage-based adjustment. Zoom-first, from your Miami base.",
  },
  {
    title: "Your own AI assistant",
    body: "In one of our weekly meetings we set up your own AI assistant together, with starter instructions built for your practice, so routine drafting and summarizing sit with you, not on your bill.",
  },
  {
    title: "A weekly pace report",
    body: "New clients against the one-a-week target, in plain numbers, reviewed on our weekly call. If the pace slips, we change something that week, not that quarter.",
  },
];

const NOT_INCLUDED = [
  {
    title: "Social media management",
    body: "Posting, content calendars, and engagement on your social accounts. A separate service, priced separately.",
  },
  {
    title: "SEO and AI search work",
    body: "Search strategy and content built to rank, and work to get the practice cited in AI answers. A separate service, priced separately.",
  },
  {
    title: "Ongoing profile management",
    body: "Regular Google Business Profile posts and review campaigns beyond the one-time setup in Block Two.",
  },
  {
    title: "Paid advertising",
    body: "Running Google or Meta ad campaigns. If we ever test ads, the spend is paid by the practice directly and the management is scoped on its own.",
  },
];

export default function ShaoLawProposalPage() {
  return (
    <BlogShell>
      <main className="mx-auto max-w-3xl px-6 pt-12 pb-20">
        <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
          Desk Agent · Proposal for Shao Law
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
          A back office that runs itself, built in two blocks
        </h1>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Jath, this is the whole engagement on one page, so you can see exactly
          what you are paying for before we talk. Eight weeks, in two blocks. Two payments of
          $500: the first buys weeks one to four, the second lands at week
          four, so the full $1,000 is paid inside the first month. One meeting
          a week. One measure that matters: one new client a week, on our way
          to more.
        </p>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          The work splits cleanly in two. Block One fixes the front door: how a
          client finds you, books, pays, and hands you their documents. Block
          Two connects it all and points it at growth. Read both, bring your
          questions, and our call is the Q&amp;A for this page.
        </p>

        <section className="mt-12 rounded-xl border border-white/10 p-6">
          <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
            Block One · $500 · Weeks 1–4
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white">
            The front door and the inbox
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {BLOCK_ONE.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 p-5">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-8 font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
            Before we start, I need four things from you
          </h3>
          <ul className="mt-4 space-y-3">
            {BEFORE_WE_START.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-white/10 p-6">
          <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
            Block Two · $500 at week 4 · Weeks 5–8
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white">
            Glue and growth
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {BLOCK_TWO.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 p-5">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
            Not included in this engagement
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            So there are no surprises later: the $1,000 covers the back office
            above, and only that. These are separate services with their own
            pricing, available whenever you want them, never folded quietly into
            this fee.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {NOT_INCLUDED.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 p-5">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-white/10 p-6">
          <h2 className="font-display text-2xl font-semibold text-white">The terms, plainly</h2>
          <ul className="mt-4 space-y-3">
            {[
              "$1,000 total: $500 to start, $500 at week four. Eight weeks of work.",
              "At week eight we decide together: continue at $500 a month, or stop cleanly.",
              "Built from tools that already exist, connected together. No custom software you would be locked into.",
              "No automation ever gives legal advice. Anything legal gets flagged to you, and every client-facing automated message carries your approved wording.",
              "Success is counted in new clients per week, reported weekly, starting from a baseline we record together.",
            ].map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Questions on any of it, that is what our call is for. Come with the
            hard ones.
          </p>
        </section>
      </main>
    </BlogShell>
  );
}
