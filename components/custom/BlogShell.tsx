import Link from 'next/link';
import SiteNav from './SiteNav';

const mono = 'font-mono text-xs text-muted-foreground hover:text-white transition-colors tracking-widest uppercase';

export default function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>{children}</main>
      <footer className="relative z-10 border-t border-[hsl(var(--border-subtle))] py-8 mt-24">
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
