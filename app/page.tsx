"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowDown } from "lucide-react";

import CredentialStrip from "@/components/custom/CredentialStrip";
import StatCounter from "@/components/custom/StatCounter";
import BentoWork from "@/components/custom/BentoWork";
import PublicationCard from "@/components/custom/PublicationCard";

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: "FaceRater AI",
    description:
      "On-device facial recognition iOS app. TensorFlow/PyTorch model training, CoreML + Vision Framework for in-app inference, SwiftUI frontend.",
    tags: ["Swift", "SwiftUI", "CoreML", "TensorFlow", "PyTorch"],
    url: "https://github.com/stars/rabdulsal/lists/facerater-ai-codebases",
    image: "https://res.cloudinary.com/djhqucpvr/image/upload/v1744663749/iy0tgyekxtfjqhnkq8v6.webp",
    highlight: true,
  },
  {
    name: "Desk Agent",
    description:
      "AI-powered customer communications SaaS — voice scheduling, chatbots, automated SMS. Built for SMBs.",
    tags: ["React", "TypeScript", "Node.js", "AI", "Twilio"],
    url: "https://desk-agent.replit.app/",
    image: "https://res.cloudinary.com/djhqucpvr/image/upload/v1744605477/klayb3zblpj2fboim0hm.jpg",
    highlight: false,
  },
  {
    name: "GoTrotter",
    description:
      "Intelligent travel planner. AI-generated daily itineraries based on budget and preferences. Stripe, Google Maps, full-stack.",
    tags: ["React", "TypeScript", "Express", "Stripe", "Google Maps"],
    url: "https://gotrotter.replit.app",
    image: "https://res.cloudinary.com/djhqucpvr/image/upload/v1744678786/av1h1l8ngva7veowqibb.jpg",
    highlight: false,
  },
];

const SKILLS: { domain: string; items: string[] }[] = [
  {
    domain: "iOS / Mobile",
    items: ["Swift", "SwiftUI", "UIKit", "WatchKit", "Xcode", "CoreData", "NFC"],
  },
  {
    domain: "AI / Machine Learning",
    items: ["CoreML", "TensorFlow", "PyTorch", "Vision", "OpenAI", "Claude / Anthropic"],
  },
  {
    domain: "Automation / DevOps",
    items: ["Fastlane", "Azure DevOps", "Power Automate", "GitHub Actions", "Python"],
  },
  {
    domain: "Web / Full-Stack",
    items: ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "Supabase"],
  },
];

// ── Section label component ───────────────────────────────────────────────────

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-xs text-orange tracking-widest">{number}</span>
      <span className="h-px w-8 bg-orange/40" />
      <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Home() {
  // Scroll-based nav opacity
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(10,15,30,0)", "rgba(10,15,30,0.95)"] as string[]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Fixed Nav ─────────────────────────────────────────────────── */}
      <motion.nav
        style={{ backgroundColor: navBg as any }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <img
            src="https://res.cloudinary.com/djhqucpvr/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png"
            alt="Rashad Salaam"
            width={34}
            height={34}
            className="rounded-full block"
          />
          <div className="hidden md:flex items-center gap-8">
            {["Work", "Research", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs text-muted-foreground hover:text-white transition-colors tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/rashadabdulsalaam/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-orange hover:text-orange/80 transition-colors tracking-widest uppercase"
          >
            LinkedIn ↗
          </a>
        </div>
      </motion.nav>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
        <div className="grain-overlay" />
        <div className="dot-grid" />

        {/* Glow orb behind photo */}
        <div className="absolute top-1/3 right-[5%] w-[500px] h-[500px] rounded-full bg-orange/[0.04] blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 flex-1 flex items-end max-w-6xl mx-auto w-full px-6 pb-16 pt-32">
          <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-end">

            {/* Left: name + sub */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              {/* Section label */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  PORTFOLIO 2025
                </span>
              </div>

              {/* Oversized name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold leading-[0.9] tracking-tighter text-white"
                style={{ fontSize: "clamp(64px, 11vw, 152px)" }}
              >
                RASHAD
                <br />
                SALAAM
              </motion.h1>

              {/* Subtitle bar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-6 bg-orange" />
                <span className="font-mono text-xs text-orange tracking-[0.2em] uppercase">
                  Staff iOS Engineer + AI Automation
                </span>
              </motion.div>

              {/* One-liner */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-muted-foreground text-base max-w-md leading-relaxed"
              >
                10 years building enterprise iOS at scale. CIO 100 Award winner.
                Published AI researcher. Founder at{" "}
                <span className="text-white">Salaam Solutions LLC</span>.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.65 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 bg-orange text-background font-mono text-xs font-bold px-5 py-2.5 rounded-lg tracking-wide hover:bg-orange/90 transition-colors"
                >
                  View My Work
                </a>
                <a
                  href="mailto:rabdulsalaam@gmail.com"
                  className="inline-flex items-center gap-2 border border-[hsl(var(--border-subtle))] text-muted-foreground font-mono text-xs px-5 py-2.5 rounded-lg tracking-wide hover:border-white/30 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Get in Touch
                </a>
              </motion.div>
            </div>

            {/* Right: photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Orange top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange z-10" />
                {/* Photo */}
                <div className="w-[260px] lg:w-[320px] aspect-[3/4] overflow-hidden relative bg-[hsl(var(--surface))]">
                  <img
                    src="https://res.cloudinary.com/djhqucpvr/image/upload/v1744694549/t5qicy62lx8uah5ky0zc.png"
                    alt="Rashad Salaam"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                </div>
                {/* Social links beside photo */}
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden lg:flex">
                  {[
                    { icon: Github,   href: "https://github.com/rabdulsal",                  label: "GitHub"   },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/rashadabdulsalaam/", label: "LinkedIn" },
                    { icon: Mail,     href: "mailto:rabdulsalaam@gmail.com",                  label: "Email"    },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 flex justify-center pb-8"
        >
          <a href="#credentials" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-white transition-colors">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* ── Credential Strip ──────────────────────────────────────────── */}
      <div id="credentials">
        <CredentialStrip />
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[hsl(var(--border-subtle))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-[hsl(var(--border-subtle))]">
            {[
              { value: "10+", label: "Years iOS",     sublabel: "Enterprise + Mobile" },
              { value: "3",   label: "Platforms",     sublabel: "Built at scale" },
              { value: "1",   label: "Award",         sublabel: "Penn Medicine CIO 100" },
              { value: "1",   label: "Publication",   sublabel: "JCO · Peer-reviewed" },
            ].map((s) => (
              <div key={s.label} className="md:px-10 first:pl-0 last:pr-0">
                <StatCounter value={s.value} label={s.label} sublabel={s.sublabel} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work ──────────────────────────────────────────────────────── */}
      <section id="work" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel number="01" label="Work" />
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-3 leading-tight">
              Where I've
              <br />
              <span className="text-orange">built.</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg">
              Enterprise-scale iOS across healthcare, logistics, finance — and founding a SaaS company on the side.
            </p>
          </motion.div>
          <BentoWork />
        </div>
      </section>

      {/* ── Research ──────────────────────────────────────────────────── */}
      <section id="research" className="py-24 border-t border-[hsl(var(--border-subtle))]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel number="02" label="Research" />
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-3 leading-tight">
              Published
              <br />
              <span className="text-orange">researcher.</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg">
              Co-authored peer-reviewed research at the intersection of mobile engineering and clinical AI.
            </p>
          </motion.div>
          <PublicationCard />
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 border-t border-[hsl(var(--border-subtle))]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel number="03" label="Projects" />
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-3 leading-tight">
              Selected
              <br />
              <span className="text-orange">work.</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg">
              From on-device AI to full-stack SaaS — products that ship and run in production.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bento-card group block bg-[hsl(var(--surface))] rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.highlight && (
                    <div className="absolute top-3 left-3 bg-orange text-background font-mono text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg text-white">{project.name}</h3>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--surface-2))] text-muted-foreground border border-[hsl(var(--border-subtle))] tracking-wide"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 border-t border-[hsl(var(--border-subtle))]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel number="04" label="Skills" />
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-10 leading-tight">
              The stack.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((domain, i) => (
              <motion.div
                key={domain.domain}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bento-card bg-[hsl(var(--surface))] rounded-xl p-5"
              >
                <div className="font-mono text-[10px] text-orange tracking-widest uppercase mb-4">
                  {domain.domain}
                </div>
                <ul className="space-y-2">
                  {domain.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-orange/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 border-t border-[hsl(var(--border-subtle))]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel number="05" label="Contact" />
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-3 leading-tight">
              Let's talk.
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md">
              Open to Staff iOS, Principal, and VP Mobile Engineering roles. Reach out directly.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4 items-center mb-8">
            <a
              href="mailto:rabdulsalaam@gmail.com"
              className="inline-flex items-center gap-2 bg-orange text-background font-mono text-xs font-bold px-6 py-3 rounded-lg tracking-wide hover:bg-orange/90 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              rabdulsalaam@gmail.com
            </a>

            <a
              href="https://www.linkedin.com/in/rashadabdulsalaam/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[hsl(var(--border-subtle))] text-muted-foreground font-mono text-xs px-6 py-3 rounded-lg tracking-wide hover:border-white/30 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>

            <a
              href="https://github.com/rabdulsal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[hsl(var(--border-subtle))] text-muted-foreground font-mono text-xs px-6 py-3 rounded-lg tracking-wide hover:border-white/30 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          </div>

        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-[hsl(var(--border-subtle))] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://res.cloudinary.com/djhqucpvr/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png"
            alt="Rashad Salaam"
            width={30}
            height={30}
            className="rounded-full block"
          />
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
            © {new Date().getFullYear()} Salaam Solutions LLC · All rights reserved
          </span>
          <div className="flex items-center gap-6">
            {[
              { label: "GitHub",   href: "https://github.com/rabdulsal" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/rashadabdulsalaam/" },
              { label: "Email",    href: "mailto:rabdulsalaam@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-muted-foreground hover:text-white transition-colors tracking-widest uppercase"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}
