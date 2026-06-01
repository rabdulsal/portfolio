"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WORK = [
  {
    id: "penn",
    company: "Penn Medicine",
    role: "Senior Mobile Developer",
    period: "Oct 2017 – Present",
    badge: "CIO 100 Award",
    bullets: [
      "Specimen-tracking app — Penn CIO 100 Award recipient",
      "On-device AI motion-sensing research (85% accuracy, peer-reviewed)",
      "Automated Apple DevCenter: Azure DevOps + Fastlane → 90% effort saved",
      "Microsoft Power Automate RPA workflows for clinical infrastructure",
    ],
    stack: ["Swift", "SwiftUI", "WatchKit", "CoreML", "Azure DevOps", "Python"],
    colSpan: "md:col-span-2",
    accent: true,
  },
  {
    id: "penske",
    company: "Penske Logistics",
    role: "iOS Developer · Insight Global",
    period: "Aug 2023 – Aug 2024",
    badge: "Fortune 500",
    bullets: [
      "Sole iOS architect for real-time logistics platform",
      "Served BMW, Starbucks, Lowe's + more",
      "Swift + SwiftUI + Google Maps + HERE Maps",
    ],
    stack: ["Swift", "SwiftUI", "Google Maps", "MSAL Auth", "Fastlane"],
    colSpan: "md:col-span-1",
    accent: false,
  },
  {
    id: "usaa",
    company: "USAA Banking",
    role: "iOS Developer · TekSystems",
    period: "Jan 2023 – May 2023",
    badge: "Contractor",
    bullets: [
      "Funds transfer + bill-pay flows in Swift/SwiftUI",
      "Banking-grade security and accessibility standards",
    ],
    stack: ["Swift", "SwiftUI"],
    colSpan: "md:col-span-1",
    accent: false,
  },
  {
    id: "salaam",
    company: "Salaam Solutions LLC",
    role: "Founder · CTO",
    period: "2023 – Present",
    badge: "Founder",
    bullets: [
      "Built BossMan — field-service SaaS for home contractors ($99–$349/mo)",
      "MCTB missed-call text-back tool",
      "AI automation, VoiceToCode pipeline, client delivery",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI", "Twilio"],
    colSpan: "md:col-span-2",
    accent: false,
  },
];

const BADGE_COLORS: Record<string, string> = {
  "CIO 100 Award": "bg-orange/15 text-orange border border-orange/30",
  "Fortune 500":   "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  "Contractor":    "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  "Founder":       "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

export default function BentoWork() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-auto md:auto-rows-[280px]"
    >
      {WORK.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className={`bento-card ${item.colSpan} bg-[hsl(var(--surface))] rounded-xl p-6 flex flex-col justify-between overflow-hidden relative group`}
        >
          {/* Subtle glow on accent card */}
          {item.accent && (
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent" />
          )}

          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="font-display font-bold text-xl text-white leading-tight">
                  {item.company}
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-1 tracking-wide">
                  {item.role}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`font-mono text-[10px] font-medium px-2 py-0.5 rounded-full tracking-widest uppercase ${BADGE_COLORS[item.badge]}`}>
                  {item.badge}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {item.period}
                </span>
              </div>
            </div>

            <ul className="space-y-1.5">
              {item.bullets.map((b, j) => (
                <li key={j} className="flex gap-2 text-sm text-muted-foreground leading-snug">
                  <span className="text-orange/60 mt-0.5 shrink-0">›</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {item.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] tracking-wide px-2 py-0.5 rounded bg-[hsl(var(--surface-2))] text-muted-foreground border border-[hsl(var(--border-subtle))]"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
