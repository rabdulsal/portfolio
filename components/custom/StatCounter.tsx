"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatCounterProps {
  value: string;   // e.g. "10+" or "3" or "1"
  label: string;
  sublabel?: string;
}

export default function StatCounter({ value, label, sublabel }: StatCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [displayed, setDisplayed] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    // Parse numeric part
    const suffix = value.replace(/[0-9]/g, "");
    const target = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(target)) { setDisplayed(value); return; }

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayed(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-display font-bold text-[clamp(48px,5vw,80px)] leading-none tracking-tight text-white tabular-nums">
        {displayed}
      </div>
      <div className="font-mono text-xs tracking-widest uppercase text-orange mt-2">
        {label}
      </div>
      {sublabel && (
        <div className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mt-1">
          {sublabel}
        </div>
      )}
    </div>
  );
}
