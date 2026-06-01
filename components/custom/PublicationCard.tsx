"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";

export default function PublicationCard() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative rounded-xl overflow-hidden border border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface))]"
    >
      {/* Orange left border accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange" />

      {/* Oversized background quote mark */}
      <div
        className="absolute right-6 top-0 font-display font-bold text-[220px] leading-none text-orange/[0.04] select-none pointer-events-none"
        aria-hidden
      >
        ❝
      </div>

      <div className="pl-8 pr-8 py-10 relative z-10">
        {/* Journal label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] tracking-widest uppercase text-orange font-medium">
            Peer-Reviewed Research
          </span>
          <span className="text-[hsl(var(--border-subtle))]">·</span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
            JCO Clinical Cancer Informatics · Vol. 7 · 2023
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-2xl md:text-3xl text-white leading-tight max-w-2xl mb-4">
          Detection of Medication Taking Using a Wrist-Worn Commercially Available Wearable Device
        </h3>

        {/* Authors */}
        <p className="font-mono text-xs text-muted-foreground mb-6 leading-relaxed">
          Laughlin A.I., Cao Q., Bryson R., Haughey V.,{" "}
          <span className="text-white font-medium">Abdul-Salaam R.</span>,{" "}
          Gonzenbach V., Rudraraju M., &amp; Shou H.
        </p>

        {/* Key result */}
        <div className="inline-flex items-center gap-3 bg-orange/10 border border-orange/20 rounded-lg px-4 py-2.5 mb-6">
          <span className="font-display font-bold text-2xl text-orange">85%</span>
          <span className="font-mono text-xs text-muted-foreground leading-tight">
            Median accuracy<br />in medication detection
          </span>
        </div>

        {/* DOI link */}
        <div>
          <a
            href="https://doi.org/10.1200/CCI.22.00107"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-white transition-colors group"
          >
            <span>doi.org/10.1200/CCI.22.00107</span>
            <ExternalLink
              className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
