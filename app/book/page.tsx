import type { Metadata } from "next";
import BlogShell from "@/components/custom/BlogShell";

// Rashad's Calendly: https://calendly.com/rashadsalaam
// One door: every engagement starts with the paid advisory hour.
// This points at the Calendly profile today; swap it to the dedicated
// advisory-hour event link when that event exists.
const BOOKING_URL = "https://calendly.com/rashadsalaam";

const LINKEDIN = "https://linkedin.com/in/rashadabdulsalaam";
const ADVISORY_PRICE = "$99";

export const metadata: Metadata = {
  title: "Book a call | Rashad Salaam",
  description:
    "Book a paid advisory hour with Rashad Salaam. Mobile development, AI tooling, and fractional cybersecurity consulting. Every project starts here.",
};

const HELP_AREAS = [
  {
    title: "Mobile development and architecture",
    body: "Ten years building production mobile apps, with deep work in Bluetooth and NFC and apps shipped inside regulated healthcare. App reviews, architecture calls, and rescue work on apps that grew past their first design.",
  },
  {
    title: "AI, wired into your actual work",
    body: "Everyone is telling you to use AI. Nobody is showing you where it fits the work you already do. Bring a real workflow: the Friday report, the inbox, the spreadsheet that eats your afternoon. I map the right tools to it, set them up, and build the custom piece when the shelf runs out. Measured on hours saved, not licenses bought.",
  },
  {
    title: "Fractional cybersecurity",
    body: "Security reviews, incident readiness, and the boring controls that keep a bad day from becoming a bad quarter. The postmortems on this site show how I think about failure.",
  },
  {
    title: "Getting found when customers ask AI",
    body: "AI search now answers before your website gets a click. I audit how the models describe your business and fix what they get wrong.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Book the hour",
    body: "Every engagement starts here. One paid hour, booked below. It is the only door in, for advice and for projects alike.",
  },
  {
    n: "2",
    title: "Talk",
    body: "We meet on GoogleMeet or Zoom. Bring your questions, your system, your numbers. You get direct answers, including when I am the wrong person for the work.",
  },
  {
    n: "3",
    title: "Leave with a plan",
    body: "You get written next steps after the call. If a project makes sense, you get a scoped proposal, and the fee from this hour counts toward it.",
  },
];

const FAQS = [
  {
    q: "How much time do you take on?",
    a: "I hold a full-time engineering role and take a small number of consulting clients at a time. If my calendar shows no slots, that is the honest answer for this month.",
  },
  {
    q: "What does the advisory hour cover?",
    a: "Your questions, pressure-tested: an architecture decision, a security worry, an AI idea, a vendor claim you want checked. You leave with clear next steps, in writing.",
  },
  {
    q: "How do projects start?",
    a: "With the advisory hour. We use it to scope the work honestly. If there is a fit, you get a written proposal with a fixed shape and price, and the hour fee counts toward the project when you start within 30 days. The price is the bridge: it keeps the advice honest and the project grounded.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. Calls run on Zoom and project work runs remote, with Philadelphia-area clients able to meet in person when it helps.",
  },
];

export default function BookPage() {
  return (
    <BlogShell>
      <main className="mx-auto max-w-3xl px-6 pt-12 pb-20">
        <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
          Work with me
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
          Every engagement starts with one paid hour
        </h1>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          I am a senior mobile engineer with ten years in production software, a
          clinical background before that, and a healthcare MBA. I consult on a
          small number of projects at a time. Advice and projects come through
          the same door: one paid hour where we find out if the work is real and
          whether I am the right person for it.
        </p>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Or the simpler case: everyone is telling you to use AI, and nobody has
          shown you where it fits the work you already do. Bring the work
          itself, the report, the inbox, the spreadsheet that eats your
          afternoon. We start there.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/book-problem.webp"
          alt="A business owner late at night, stressed at a laptop covered in reports"
          className="mt-10 w-full rounded-xl border border-white/10"
        />

        <section className="mt-12">
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
            What I help with
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {HELP_AREAS.map((area) => (
              <div
                key={area.title}
                className="rounded-xl border border-white/10 p-5"
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {area.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
            How it works
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="rounded-xl border border-white/10 p-5"
              >
                <p className="font-display text-2xl font-semibold text-orange">
                  {step.n}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-white/10 p-6">
          <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
            Advisory · {ADVISORY_PRICE} / hour
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white">
            Book an hour with me
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            You have an idea, a system, or a decision you want pressure-tested.
            Or you bring the work itself, and we find where AI fits it. We spend
            one hour on your questions. You leave with clear next steps, in
            writing. Thinking about a project? This hour is where it starts too.
            If we begin the project within 30 days, this fee counts toward it.
            The price is the bridge between advice and real work.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/book-solution.webp"
            alt="The same owner, relaxed, reviewing the numbers with an advisor beside him"
            className="mt-6 w-full rounded-xl border border-white/10"
          />
          {BOOKING_URL ? (
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <iframe
                src={BOOKING_URL}
                title="Book an advisory hour"
                className="h-[640px] w-full"
                loading="lazy"
              />
            </div>
          ) : (
            <a
              href={LINKEDIN}
              className="mt-5 inline-block font-mono text-xs tracking-widest uppercase text-orange hover:text-white"
            >
              Reach me on LinkedIn →
            </a>
          )}
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
            Questions
          </h2>
          <div className="mt-5 grid gap-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-white/10 p-5"
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </BlogShell>
  );
}
