"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";

const LOGO =
  "https://res.cloudinary.com/djhqucpvr/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png";

// One nav for the whole site. Section links point at the homepage anchors
// so they work from every page, not just the homepage.
const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog/" },
  { label: "Book", href: "/book" },
];

const LINKEDIN = "https://www.linkedin.com/in/rashadabdulsalaam/";

function linkClass(active: boolean) {
  return active
    ? "font-mono text-xs text-orange tracking-widest uppercase"
    : "font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase";
}

export default function SiteNav({ variant = "sticky" }: { variant?: "sticky" | "fixed" }) {
  const pathname = usePathname() || "/";
  const { resolvedTheme } = useTheme();
  const { scrollY } = useScroll();
  const clear = resolvedTheme === "dark" ? "rgba(10,15,30,0)" : "rgba(250,247,242,0)";
  const solid = resolvedTheme === "dark" ? "rgba(10,15,30,0.95)" : "rgba(250,247,242,0.95)";
  const navBg = useTransform(scrollY, [0, 80], [clear, solid] as string[]);

  const isActive = (label: string) =>
    (label === "Blog" && pathname.startsWith("/blog")) ||
    (label === "Book" && pathname.startsWith("/book"));

  const inner = (
    <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <Link href="/" aria-label="Home" className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Rashad Salaam" width={34} height={34} className="rounded-full block" />
      </Link>
      <div className="hidden lg:flex items-center gap-7">
        {LINKS.map(({ label, href }) => (
          <Link key={label} href={href} className={linkClass(isActive(label))}>
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <Link href="/blog/" className={`${linkClass(isActive("Blog"))} lg:hidden`}>
          Blog
        </Link>
        <Link href="/book" className={`${linkClass(isActive("Book"))} lg:hidden`}>
          Book
        </Link>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-orange hover:text-orange/80 transition-colors tracking-widest uppercase"
        >
          LinkedIn ↗
        </a>
        <ThemeToggle />
      </div>
    </div>
  );

  if (variant === "fixed") {
    return (
      <motion.nav
        style={{ backgroundColor: navBg as any }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm border-b border-border/50"
      >
        {inner}
      </motion.nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-sm">
      {inner}
    </nav>
  );
}
