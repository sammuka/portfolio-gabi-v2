"use client";

/**
 * BackToTop — client button that scrolls to the top of the page.
 * Uses Lenis instance via `window.__lenis` if available (see SmoothScroll);
 * fallback: native `window.scrollTo({ top: 0, behavior: 'smooth' })`.
 *
 * Extracted as a client island so the colophon section can remain a
 * server component.
 */

interface BackToTopProps {
  label: string;
  className?: string;
}

type LenisLike = { scrollTo: (target: number | string, options?: { duration?: number }) => void };

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

export function BackToTop({ label, className }: BackToTopProps) {
  function handleClick() {
    if (typeof window === "undefined") return;
    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "body-base text-left transition-colors duration-300",
        "hover:text-accent focus-visible:text-accent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}

export default BackToTop;
