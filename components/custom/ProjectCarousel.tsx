"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  name: string;
  description: string;
  tags: string[];
  url: string;
  image: string;
  highlight?: boolean;
}

const variants = {
  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex]   = useState(0);
  const [dir, setDir]       = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  const prev = () => go((index - 1 + projects.length) % projects.length);
  const next = () => go((index + 1) % projects.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex(i => (i + 1) % projects.length);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, projects.length]);

  const p = projects[index];

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden bento-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Image slide ─────────────────────────────────────────── */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[hsl(var(--surface))]">
        <AnimatePresence custom={dir} initial={false}>
          <motion.a
            key={index}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0 block group"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Bottom gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

            {/* Featured badge */}
            {p.highlight && (
              <div className="absolute top-4 left-4 bg-orange text-background font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase z-10">
                Featured
              </div>
            )}
          </motion.a>
        </AnimatePresence>

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous project"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/70 backdrop-blur-sm border border-white/10 text-white hover:bg-background/90 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next project"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/70 backdrop-blur-sm border border-white/10 text-white hover:bg-background/90 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Project info ─────────────────────────────────────────── */}
      <div className="bg-[hsl(var(--surface))] border-t border-[hsl(var(--border-subtle))] px-6 py-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-display font-bold text-xl text-white leading-tight">
            {p.name}
          </h3>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-orange hover:text-orange/80 transition-colors tracking-wide shrink-0 mt-1"
          >
            Visit ↗
          </a>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {p.description}
        </p>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--surface-2))] text-muted-foreground border border-[hsl(var(--border-subtle))] tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Dot / pill indicators */}
          <div className="flex items-center gap-1.5 shrink-0">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 h-1.5 bg-orange"
                    : "w-1.5 h-1.5 bg-[hsl(var(--border-subtle))] hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
