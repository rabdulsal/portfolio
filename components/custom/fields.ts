/**
 * Shared form-field classes for the funnel pages and their forms
 * (intake page, AeoDemo, GuideSignupForm, and future forms).
 * One definition, imported everywhere; do not copy these strings into a
 * component. Fills and borders are foreground-based so fields read
 * correctly in light and dark mode (white-based fills were the
 * light-mode bug).
 */

export const inputCls =
  "w-full px-3 py-2.5 rounded-md bg-foreground/5 border border-foreground/15 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-orange/60 focus:border-orange/60";

export const labelCls =
  "block font-mono text-[11px] tracking-widest uppercase text-muted-foreground mb-1.5";

/** Full-width primary submit button. */
export const primaryBtnCls =
  "w-full py-3 rounded-md bg-orange text-white font-mono text-sm tracking-widest uppercase hover:bg-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

/** Primary button that shares a row with a ghost button (flex-1). */
export const flexBtnCls =
  "flex-1 py-3 rounded-md bg-orange text-white font-mono text-sm tracking-widest uppercase hover:bg-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

/** Secondary outline button that sits beside a primary button. */
export const ghostBtnCls =
  "py-3 px-5 rounded-md border border-foreground/15 font-mono text-sm tracking-widest uppercase hover:border-orange/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

/** Small text-only action under a form (reset, start over). */
export const linkBtnCls =
  "mt-4 font-mono text-[11px] tracking-widest uppercase text-muted-foreground hover:text-orange transition-colors";
