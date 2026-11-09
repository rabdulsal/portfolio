export default function BlogHero() {
  return (
    <section className="relative overflow-hidden border-b border-[hsl(var(--border-subtle))]">
      <div className="dot-grid" />
      <div className="grain-overlay" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-orange mb-3">Blog</p>
          <h1 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-white">
            Agentic engineering, security, and the boring work that matters.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            What broke, why, and what to check on Monday.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/blog-index-hero.webp"
          alt="A desk with a hand-drawn systems architecture sketch, a leather briefcase secured by a four-digit combination lock, and a key-fob token."
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl border border-white/10 shadow-2xl shadow-black/50"
        />
      </div>
    </section>
  );
}
