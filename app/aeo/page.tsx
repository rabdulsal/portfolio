import type { Metadata } from "next";
import BlogShell from "@/components/custom/BlogShell";
import GuideSignupForm from "@/components/custom/GuideSignupForm";
import AeoDemo from "@/components/custom/AeoDemo";

export const metadata: Metadata = {
  title: "When Customers Ask AI — Free Guide | Rashad Salaam",
  description:
    "Customers ask AI who to hire now. This free 2-page guide shows the loop that gets a local business picked: profile, reviews, citations, bookings.",
};

const STATS = [
  { value: "39.4%", label: "of US desktop searches now carry an AI Overview" },
  { value: "68%", label: "of searches end without a single click" },
  { value: "97%", label: "of customers read reviews before they choose" },
  { value: "45%", label: "now ask an AI tool for local recommendations" },
];

const LOOP = [
  {
    step: "01",
    title: "Complete the profile",
    body: "Every field, every photo, every hour, correct. AI answers pull from your business profile first. Gaps read as absence.",
  },
  {
    step: "02",
    title: "Earn reviews on a rhythm",
    body: "Ask after every good job. Reply to every review. Fresh reviews are the strongest signal that you are open, active, and trusted.",
  },
  {
    step: "03",
    title: "Fix your citations",
    body: "Name, address, and phone identical everywhere the web lists you. Mismatches split your record and cost you the mention.",
  },
  {
    step: "04",
    title: "Make booking one tap",
    body: "The AI names you, the customer acts in seconds. A slow booking path hands the job to the next name on the list.",
  },
];

export default function AeoGuidePage() {
  return (
    <BlogShell>
      {/* Fixed background: waves across the bottom and right, darkened; only the content scrolls */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/aeo-waves.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/50 to-background/30" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: summary, stats, loop */}
          <div>
            <p className="font-mono text-xs text-orange tracking-widest uppercase mb-4">
              AEO · Answer Engine Optimization
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
              When customers ask AI, does it name your business?
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                Customers stopped scrolling ten blue links. They ask ChatGPT, Gemini, or
                Google&apos;s AI Overview one question and take the answer it gives. If your
                business is not in that answer, you do not exist for that customer.
              </p>
              <p>
                Getting picked runs on a system: a complete profile, a steady run of reviews,
                consistent citations, and a booking path that works in seconds. I run that
                system for local practices and service businesses. The free guide below lays
                out the loop and the checklist, the same one I work every week and every month.
              </p>
              <p>
                Two pages. Five minutes to read. Leave your name and email, confirm once, and
                it lands in your inbox.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden mb-10">
              {STATS.map((s) => (
                <div key={s.label} className="bg-background p-5">
                  <div className="font-display text-3xl font-bold text-orange mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-5">
              {LOOP.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="font-mono text-xs text-orange tracking-widest pt-1">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: live demo, then the guide form */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-lg border border-orange/30 bg-background/85 backdrop-blur-md p-6 md:p-8 mb-6">
              <p className="font-mono text-xs text-orange tracking-widest uppercase mb-2">
                Live demo
              </p>
              <h2 className="font-display text-2xl font-bold mb-2">
                See what the AI says about you
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Type your company name. A live AI answers the same question your next
                customer asks it. You see the start of the answer here. The full answer
                goes by email.
              </p>
              <AeoDemo />
            </div>
            <div className="rounded-lg border border-white/10 bg-background/85 backdrop-blur-md p-6 md:p-8">
              <p className="font-mono text-xs text-orange tracking-widest uppercase mb-2">
                Free guide
              </p>
              <h2 className="font-display text-2xl font-bold mb-2">
                When Customers Ask AI
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                The 2-page guide to getting picked: the shift, the four-step loop, and the
                weekly and monthly checklist. Tell me where to send it.
              </p>
              <GuideSignupForm />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-4 px-1">
              Want the loop run for you? Signup gets you the guide first. Reply to it and we
              talk about your practice.
            </p>
          </div>
        </div>
      </div>
    </BlogShell>
  );
}
