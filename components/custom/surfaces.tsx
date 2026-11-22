import type { ReactNode } from "react";

/**
 * Shared surfaces for the funnel pages (/aeo, /intake, and future pages).
 * One definition of the waves backdrop, the solid panel, the translucent
 * card, and the accent notice, so a lighting or spacing fix lands in one
 * place instead of being re-invented per page. All borders and fills use
 * foreground-based tokens so they read correctly in light and dark mode;
 * never use white-based borders/fills here (that was the light-mode bug).
 */

export function WavesBackdrop({
  image = "/images/aeo-waves.jpg",
}: {
  image?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/50 to-background/30" />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

export function Panel({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border border-foreground/10 bg-background p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function Card({
  className = "",
  accent = false,
  children,
}: {
  className?: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border ${
        accent ? "border-orange/30" : "border-foreground/10"
      } bg-background/95 p-6 backdrop-blur-md md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function Notice({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border border-orange/30 bg-orange/5 p-5 ${className}`}
    >
      {children}
    </div>
  );
}
