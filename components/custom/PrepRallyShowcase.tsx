"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple } from "lucide-react";

const SHOTS = [
  "/screenshots/preprally/01-welcome.png",
  "/screenshots/preprally/04-recording.png",
  "/screenshots/preprally/02-session-setup.png",
  "/screenshots/preprally/03-results-feedback.png",
];

const APP_URL =
  "https://apps.apple.com/us/app/preprally-interview-practice/id6789340716";

const TAGS = [
  "React Native",
  "Expo",
  "Deepgram",
  "Claude",
  "OpenAI TTS",
  "Supabase",
  "AWS S3",
];

export default function PrepRallyShowcase() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % SHOTS.length), 2800);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div className="bento-card rounded-xl overflow-hidden mb-8 border border-[hsl(var(--border-subtle))]">
      <div className="grid md:grid-cols-2">
        {/* ── Copy ─────────────────────────────────────────────── */}
        <div className="p-8 md:p-10 flex flex-col justify-center bg-[hsl(var(--surface))]">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-orange text-background font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase">
              Featured
            </span>
            <span className="font-mono text-[11px] text-orange tracking-widest uppercase">
              Live on the App Store
            </span>
          </div>

          <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            PrepRally
          </h3>

          <p className="text-muted-foreground leading-relaxed mb-5 max-w-md">
            An AI interview-coaching app I built and shipped solo, end to end. It
            asks you a real interview question out loud, you answer out loud on a
            walk, and it grades your content, pace, filler words, and STAR
            structure, then reads you a spoken summary. Rehearse out loud, get
            graded.
          </p>

          <div className="flex flex-wrap gap-1.5 mb-7">
            {TAGS.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--surface-2))] text-muted-foreground border border-[hsl(var(--border-subtle))] tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download PrepRally on the App Store"
            className="inline-flex items-center gap-2.5 self-start bg-white text-black rounded-xl px-5 py-2.5 hover:bg-white/90 transition-colors"
          >
            <Apple className="w-6 h-6" />
            <span className="flex flex-col leading-none text-left">
              <span className="text-[9px] font-medium">Download on the</span>
              <span className="text-lg font-semibold -mt-0.5">App Store</span>
            </span>
          </a>
        </div>

        {/* ── Auto-scrolling phone carousel ────────────────────── */}
        <div
          className="relative flex items-center justify-center p-8 bg-gradient-to-br from-[hsl(var(--surface-2))] to-background overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative w-[210px] aspect-[9/19.5] rounded-[2.2rem] bg-black p-1.5 border border-white/10 shadow-2xl">
            <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-[hsl(var(--surface))]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={i}
                  src={SHOTS[i]}
                  alt="PrepRally app screenshot"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {SHOTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Show screenshot ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === i
                    ? "w-5 h-1.5 bg-orange"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
