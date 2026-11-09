import Link from 'next/link';

const LOGO =
  'https://res.cloudinary.com/djhqucpvr/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png';

const mono = 'font-mono text-xs text-muted-foreground hover:text-white transition-colors tracking-widest uppercase';

export default function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" aria-label="Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Rashad Salaam" width={34} height={34} className="rounded-full block" />
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className={mono}>Home</Link>
            <Link href="/blog/" className="font-mono text-xs text-orange tracking-widest uppercase">Blog</Link>
            <a
              href="https://www.linkedin.com/in/rashadabdulsalaam/"
              target="_blank"
              rel="noopener noreferrer"
              className={mono}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="border-t border-[hsl(var(--border-subtle))] py-8 mt-24">
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
            © {new Date().getFullYear()} Salaam Solutions LLC · All rights reserved
          </span>
          <Link href="/blog/rss.xml/" className={mono}>RSS</Link>
        </div>
      </footer>
    </div>
  );
}
